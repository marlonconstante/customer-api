import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { InMemoryCustomersRepository } from './repositories/in-memory-customers.repository';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: 'CustomersRepository',
          useClass: InMemoryCustomersRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
