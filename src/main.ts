import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupPrisma } from './database/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await setupPrisma(app);
  await app.listen(3000);
}

bootstrap();
