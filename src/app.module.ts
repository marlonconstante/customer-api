import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { PrismaService } from './database/prisma';

@Module({
  imports: [ConfigModule.forRoot(), CustomersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
