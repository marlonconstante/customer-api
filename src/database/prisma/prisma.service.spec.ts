import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined prisma service', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database on module init', async () => {
    const connect = jest.spyOn(service, '$connect');
    await service.onModuleInit();

    expect(connect).toBeCalledTimes(1);
  });

  it('should listen for before exit event to destroy database connection', async () => {
    const on = jest.spyOn(service, '$on');
    await service.enableShutdownHooks({} as INestApplication);

    expect(on).toBeCalledTimes(1);
    expect(on).toBeCalledWith('beforeExit', expect.any(Function));
  });
});
