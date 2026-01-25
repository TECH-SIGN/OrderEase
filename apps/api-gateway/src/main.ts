import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for API routes
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  const port = 4000;
  await app.listen(port);

  console.log(`🚀 API Gateway running on: http://localhost:${port}`);
  console.log(`📡 Routing to:`);
  console.log(`   - /api/auth → Backend Service`);
  console.log(`   - /api/users → Backend Service`);
  console.log(`   - /api/admin → Backend Service`);
  console.log(`   - /api/food → Backend Service`);
}

bootstrap();
