/**
 * Cart Repository Interface
 */

import { Cart } from '../domain/cart.entity';

export interface CartWithDetails {
  cart: Cart;
  foodDetails: Map<string, { name: string; price: number; isAvailable: boolean }>;
}

export interface ICartRepository {
  /**
   * Find cart by user ID
   */
  findByUserId(userId: string): Promise<Cart | null>;

  /**
   * Find cart with food details
   */
  findByUserIdWithDetails(userId: string): Promise<CartWithDetails | null>;

  /**
   * Clear all items from cart
   */
  clearCart(userId: string): Promise<void>;
}

export const CART_REPOSITORY = Symbol('ICartRepository');
