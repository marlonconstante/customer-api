import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerDto } from './create-customer.dto';

describe('CreateCustomerDto', () => {
  it('should validate the customer data', async () => {
    const errors = await validate(
      plainToInstance(CreateCustomerDto, {
        name: '',
        email: 'email@gmail',
        birthDate: new Date(),
      }),
    ).then((errors) =>
      errors.reduce((accumulator, { property, constraints }) => {
        return {
          ...accumulator,
          [property]: constraints,
        };
      }, {}),
    );

    expect(Object.keys(errors).length).toBe(3);
    expect(errors['name']).toEqual({ isNotEmpty: expect.any(String) });
    expect(errors['email']).toEqual({ isEmail: expect.any(String) });
    expect(errors['birthDate']).toEqual({ maxDate: expect.any(String) });
  });
});
