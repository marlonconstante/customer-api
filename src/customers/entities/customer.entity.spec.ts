import { Customer } from './customer.entity';

describe('Customer', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022/04/22'));
  });

  it('should have a constructor that sets the values', () => {
    const data = {
      id: '9798da41-40eb-445e-8a20-d538734e1db9',
      name: 'Bruno Henrique',
      email: 'bruno.henrique@gmail.com',
      birthDate: new Date('1990/12/30'),
    };

    const customer = new Customer(data);
    expect(customer.id).toBe(data.id);
    expect(customer.name).toBe(data.name);
    expect(customer.email).toBe(data.email);
    expect(customer.birthDate).toBe(data.birthDate);
  });

  it('should be able to calculate age', () => {
    const customer35 = new Customer({ birthDate: new Date('1986/08/18') });
    const customer38 = new Customer({ birthDate: new Date('1984/03/26') });
    const customer9 = new Customer({ birthDate: new Date('2013/04/12') });

    expect(customer35.age).toBe(35);
    expect(customer38.age).toBe(38);
    expect(customer9.age).toBe(9);
  });

  it('should have age property in JSON', () => {
    const customer = new Customer();
    expect(customer.toJSON()).toHaveProperty('age');
  });
});
