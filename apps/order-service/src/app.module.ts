import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@orderease/shared-database';
import { OrderModule } from './order';
import { appConfig, databaseConfig, jwtConfig } from '@orderease/shared-config';
import { AppLoggerService, RequestContextMiddleware } from './common';

@Module({
  imports: [
    // Load environment configuration from shared-config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    // Database module from shared-database (Prisma)
    DatabaseModule,
    // Feature modules - Order domain ONLY
    OrderModule,
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
