import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { InMemoryCustomersRepository } from './repositories/in-memory-customers.repository';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;
  const marlon = {
    name: 'Marlon Constante',
    email: 'marlon.constante@gmail.com',
    birthDate: new Date('1986/08/18'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: 'CustomersRepository',
          useClass: InMemoryCustomersRepository,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined controller and service for customers', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should have called service to create a customer', async () => {
    const createService = jest.spyOn(service, 'create');
    await controller.create(marlon);

    expect(createService).toBeCalledTimes(1);
    expect(createService).toBeCalledWith(marlon);
  });

  it('should have called service to find all customers', async () => {
    const findAllService = jest.spyOn(service, 'findAll');
    const pagination = { page: 1, size: 10 };
    await controller.findAll(pagination);

    expect(findAllService).toBeCalledTimes(1);
    expect(findAllService).toBeCalledWith(pagination);
  });

  it('should have called service to find a customer', async () => {
    const findOneService = jest.spyOn(service, 'findOne');
    const { id } = await service.create(marlon);
    await controller.findOne(id);

    expect(findOneService).toBeCalledTimes(1);
    expect(findOneService).toBeCalledWith(id);
  });

  it('should have called service to update a customer', async () => {
    const updateService = jest.spyOn(service, 'update');
    const data = {
      name: 'Marlon Santos Constante',
      email: 'marlonsconstante@gmail.com',
    };

    const { id } = await service.create(marlon);
    await controller.update(id, data);

    expect(updateService).toBeCalledTimes(1);
    expect(updateService).toBeCalledWith(id, data);
  });

  it('should have called service to remove a customer', async () => {
    const removeService = jest.spyOn(service, 'remove');
    const { id } = await service.create(marlon);
    await controller.remove(id);

    expect(removeService).toBeCalledTimes(1);
    expect(removeService).toBeCalledWith(id);
  });
});
