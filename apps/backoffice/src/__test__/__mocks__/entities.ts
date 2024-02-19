import { IPhone, IUser } from '@avila-tek/models';

export function mockUser(initialValue: Partial<IUser> = {}): IUser {
  return {
    email: 'juanperez@example.com',
    password: 'contraseñaSegura123',
    name: 'Juan',
    phone: mockPhone(),
    ...initialValue,
  };
}

export function mockPhone(initialValue: Partial<IPhone> = {}): IPhone {
  return {
    code: '+34',
    number: '600123456',
    ...initialValue,
  };
}
