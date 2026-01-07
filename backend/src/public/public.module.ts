import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { MenuController } from './menu.controller';
import { PublicService } from './public.service';
import { FOOD_REPOSITORY } from '../food/infra/food.repository.interface';
import { PrismaFoodRepository } from '../food/infra/prisma-food.repository';

@Module({
  controllers: [PublicController, MenuController],
  providers: [
    PublicService,
    {
      provide: FOOD_REPOSITORY,
      useClass: PrismaFoodRepository,
    },
  ],
  exports: [PublicService],
})
export class PublicModule {}
