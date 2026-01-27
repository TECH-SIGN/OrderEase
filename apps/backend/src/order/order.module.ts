import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from '@orderease/shared-database';
import { PrismaOrderRepository } from './infra/prisma-order.repository';
import { ORDER_REPOSITORY } from './infra/order.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [OrderService, ORDER_REPOSITORY],
})
export class OrderModule {}
