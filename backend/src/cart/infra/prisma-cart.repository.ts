/**
 * Prisma Cart Repository Implementation
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database';
import { Cart, CartItemProps } from '../domain/cart.entity';
import {
  ICartRepository,
  CartWithDetails,
} from './cart.repository.interface';

@Injectable()
export class PrismaCartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    const prismaCart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: true,
      },
    });

    if (!prismaCart) {
      return null;
    }

    return this.toDomain(prismaCart);
  }

  async findByUserIdWithDetails(
    userId: string,
  ): Promise<CartWithDetails | null> {
    const prismaCart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!prismaCart) {
      return null;
    }

    const items: CartItemProps[] = prismaCart.cartItems.map((item) => ({
      foodId: item.foodId,
      quantity: item.quantity,
    }));

    const cart = new Cart({
      id: prismaCart.id,
      userId: prismaCart.userId,
      items,
      createdAt: prismaCart.createdAt,
      updatedAt: prismaCart.updatedAt,
    });

    const foodDetails = new Map(
      prismaCart.cartItems.map((item) => [
        item.foodId,
        {
          name: item.food.name,
          price: item.food.price,
          isAvailable: item.food.isAvailable,
        },
      ]),
    );

    return { cart, foodDetails };
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }
  }

  private toDomain(
    prismaCart: {
      id: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      cartItems: Array<{
        foodId: string;
        quantity: number;
      }>;
    },
  ): Cart {
    const items: CartItemProps[] = prismaCart.cartItems.map((item) => ({
      foodId: item.foodId,
      quantity: item.quantity,
    }));

    return new Cart({
      id: prismaCart.id,
      userId: prismaCart.userId,
      items,
      createdAt: prismaCart.createdAt,
      updatedAt: prismaCart.updatedAt,
    });
  }
}
