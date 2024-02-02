import { IPhone, IUser } from '@avila-tek/models';

export function mockUser(initialValue: Partial<IUser> = {}): IUser {
  return {
    _id: '60d6d6d6d6d6d6d6d6d6d6d6',
    mail: 'juanperez@example.com',
    password: 'contraseñaSegura123',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: mockPhone(),
    emailVerify: true,
    dni: '12345678X',
    ...initialValue,
  };
}

export function mockPhone(initialValue: Partial<IPhone> = {}): IPhone {
  return {
    countryCode: '+34',
    number: '600123456',
    ...initialValue,
  };
}
