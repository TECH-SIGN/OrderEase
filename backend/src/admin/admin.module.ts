import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { USER_REPOSITORY } from '../user/infra/user.repository.interface';
import { PrismaUserRepository } from '../user/infra/prisma-user.repository';
import { ORDER_REPOSITORY } from '../order/infra/order.repository.interface';
import { PrismaOrderRepository } from '../order/infra/prisma-order.repository';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: ORDER_REPOSITORY,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
