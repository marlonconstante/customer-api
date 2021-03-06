import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './doc/config';
import { setupPrisma } from './database/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);
  await setupPrisma(app);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
