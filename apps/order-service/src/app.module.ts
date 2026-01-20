import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { FoodModule } from './food';
import { OrderModule } from './order';
import { CartModule } from './cart';
import { appConfig, databaseConfig, jwtConfig } from './config';
import { AppLoggerService, RequestContextMiddleware } from './common';

@Module({
  imports: [
    // Load environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    // Database module (Prisma)
    DatabaseModule,
    // Feature modules - Order domain only
    FoodModule, // TODO: Replace with HTTP calls to backend in future iteration
    OrderModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppLoggerService],
  exports: [AppLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply request context middleware to all routes
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
