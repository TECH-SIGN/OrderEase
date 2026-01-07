import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DatabaseModule } from '../database';
import { PrismaCartRepository } from './infra/prisma-cart.repository';
import { CART_REPOSITORY } from './infra/cart.repository.interface';
import { FOOD_REPOSITORY } from '../food/infra/food.repository.interface';
import { PrismaFoodRepository } from '../food/infra/prisma-food.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository,
    },
    {
      provide: FOOD_REPOSITORY,
      useClass: PrismaFoodRepository,
    },
  ],
  exports: [CartService, CART_REPOSITORY],
})
export class CartModule {}
