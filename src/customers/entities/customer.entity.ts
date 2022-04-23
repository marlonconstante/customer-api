import * as dayjs from 'dayjs';

export class Customer {
  id: string;
  name: string;
  email: string;
  birthDate: Date;

  constructor(data?: Partial<Customer>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.birthDate = data.birthDate;
    }
  }

  get age(): number {
    return dayjs().diff(this.birthDate, 'year');
  }

  toJSON(): this {
    return {
      ...this,
      age: this.age,
    };
  }
}
