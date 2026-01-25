/**
 * Base Domain Error
 * All domain-specific errors extend from this base class
 */
export class BaseDomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'BaseDomainError';
  }
}

/**
 * Order Domain Errors
 */
export class OrderDomainError extends BaseDomainError {
  constructor(message: string, code: string) {
    super(message, code);
    this.name = 'OrderDomainError';
  }

  static emptyOrder(): OrderDomainError {
    return new OrderDomainError(
      'Order must contain at least one item',
      'EMPTY_ORDER',
    );
  }

  static invalidQuantity(): OrderDomainError {
    return new OrderDomainError(
      'All items must have positive quantities',
      'INVALID_QUANTITY',
    );
  }

  static invalidPrice(): OrderDomainError {
    return new OrderDomainError(
      'All items must have positive prices',
      'INVALID_PRICE',
    );
  }

  static unavailableFood(): OrderDomainError {
    return new OrderDomainError(
      'Some food items are not available',
      'UNAVAILABLE_FOOD',
    );
  }

  static emptyCart(): OrderDomainError {
    return new OrderDomainError('Cart is empty', 'EMPTY_CART');
  }

  static orderNotFound(): OrderDomainError {
    return new OrderDomainError('Order not found', 'ORDER_NOT_FOUND');
  }

  static cannotCancel(): OrderDomainError {
    return new OrderDomainError(
      'Order cannot be cancelled in current state',
      'CANNOT_CANCEL',
    );
  }
}

/**
 * Cart Domain Errors
 */
export class CartDomainError extends BaseDomainError {
  constructor(message: string, code: string) {
    super(message, code);
    this.name = 'CartDomainError';
  }

  static notFound(): CartDomainError {
    return new CartDomainError('Cart not found', 'CART_NOT_FOUND');
  }

  static itemNotFound(): CartDomainError {
    return new CartDomainError('Cart item not found', 'CART_ITEM_NOT_FOUND');
  }

  static emptyCart(): CartDomainError {
    return new CartDomainError('Cart is empty', 'EMPTY_CART');
  }
}

/**
 * Food Domain Errors
 */
export class FoodDomainError extends BaseDomainError {
  constructor(message: string, code: string) {
    super(message, code);
    this.name = 'FoodDomainError';
  }

  static notFound(): FoodDomainError {
    return new FoodDomainError('Food item not found', 'FOOD_NOT_FOUND');
  }

  static unavailable(): FoodDomainError {
    return new FoodDomainError(
      'Food item is not available',
      'FOOD_UNAVAILABLE',
    );
  }

  static invalidPrice(): FoodDomainError {
    return new FoodDomainError('Price must be positive', 'INVALID_PRICE');
  }
}

/**
 * User Domain Errors
 */
export class UserDomainError extends BaseDomainError {
  constructor(message: string, code: string) {
    super(message, code);
    this.name = 'UserDomainError';
  }

  static notFound(): UserDomainError {
    return new UserDomainError('User not found', 'USER_NOT_FOUND');
  }

  static alreadyExists(): UserDomainError {
    return new UserDomainError('User already exists', 'USER_ALREADY_EXISTS');
  }

  static invalidCredentials(): UserDomainError {
    return new UserDomainError('Invalid credentials', 'INVALID_CREDENTIALS');
  }

  static invalidPassword(): UserDomainError {
    return new UserDomainError(
      'Current password is incorrect',
      'INVALID_PASSWORD',
    );
  }
}
