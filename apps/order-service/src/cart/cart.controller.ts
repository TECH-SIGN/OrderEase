import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from '@orderease/shared-dtos';

import { successResponse } from '@orderease/shared-utils';

@Controller('cart')

export class CartController {
  constructor(private cartService: CartService) {}

  /**
   * Get current user's cart
   * GET /cart
   */
  @Get()
  async getCart(@Param('userId') userId: string = 'user-1') {
    const cart = await this.cartService.getCart(userId);
    return successResponse('Cart fetched successfully', cart);
  }

  /**
   * Add item to cart
   * POST /cart
   */
  @Post()
  async addToCart(
    @Param('userId') userId: string = 'user-1',
    @Body() addToCartDto: AddToCartDto,
  ) {
    const cart = await this.cartService.addToCart(userId, addToCartDto);
    return successResponse('Item added to cart successfully', cart);
  }

  /**
   * Update cart item quantity
   * PUT /cart/:itemId
   */
  @Put(':itemId')
  async updateCartItem(
    @Param('userId') userId: string = 'user-1',
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const cart = await this.cartService.updateCartItem(
      userId,
      itemId,
      updateCartItemDto,
    );
    return successResponse('Cart item updated successfully', cart);
  }

  /**
   * Remove item from cart
   * DELETE /cart/:itemId
   */
  @Delete(':itemId')
  async removeFromCart(
    @Param('userId') userId: string = 'user-1',
    @Param('itemId') itemId: string,
  ) {
    const cart = await this.cartService.removeFromCart(userId, itemId);
    return successResponse('Item removed from cart successfully', cart);
  }

  /**
   * Clear cart
   * DELETE /cart
   */
  @Delete()
  async clearCart(@Param('userId') userId: string = 'user-1') {
    const cart = await this.cartService.clearCart(userId);
    return successResponse('Cart cleared successfully', cart);
  }
}
