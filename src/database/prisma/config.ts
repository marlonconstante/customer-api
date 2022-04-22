import { INestApplication } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export function setupPrisma(app: INestApplication): Promise<void> {
  const service = app.get(PrismaService);
  return service.enableShutdownHooks(app);
}
