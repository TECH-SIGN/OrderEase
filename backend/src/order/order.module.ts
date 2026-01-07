import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaOrderRepository } from './infra/prisma-order.repository';
import { ORDER_REPOSITORY } from './infra/order.repository.interface';
import { FOOD_REPOSITORY } from '../food/infra/food.repository.interface';
import { PrismaFoodRepository } from '../food/infra/prisma-food.repository';
import { CART_REPOSITORY } from '../cart/infra/cart.repository.interface';
import { PrismaCartRepository } from '../cart/infra/prisma-cart.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: PrismaOrderRepository,
    },
    {
      provide: FOOD_REPOSITORY,
      useClass: PrismaFoodRepository,
    },
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
