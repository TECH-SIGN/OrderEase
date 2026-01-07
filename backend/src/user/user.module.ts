import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaUserRepository } from './infra/prisma-user.repository';
import { USER_REPOSITORY } from './infra/user.repository.interface';
import { ORDER_REPOSITORY } from '../order/infra/order.repository.interface';
import { PrismaOrderRepository } from '../order/infra/prisma-order.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: ORDER_REPOSITORY,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [UserService, USER_REPOSITORY],
})
export class UserModule {}
