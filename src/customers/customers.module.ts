import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaCustomersRepository } from './repositories/prisma-customers.repository';
import { PrismaService } from '../database/prisma';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    PrismaService,
    {
      provide: 'CustomersRepository',
      useClass: PrismaCustomersRepository,
    },
  ],
})
export class CustomersModule {}
