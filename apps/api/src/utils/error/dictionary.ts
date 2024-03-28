export const errorTitleDictionary: {
  [status: number]: {
    [type: string]: { [lang: string]: string };
  };
} = {
  400: {
    default: {
      en: 'Bad request',
      es: 'Petición incorrecta',
    },
    pageOutOfRange: {
      en: 'Page is out of range',
      es: 'La página está fuera del rango',
    },
    user: {
      en: 'Error creating user',
      es: 'Error creando usuario',
    },
  },
  401: {
    default: {
      en: 'Unauthorized',
      es: 'No autorizado',
    },
    token: {
      en: 'Valid token most be provided',
      es: 'Debe proporcionar un token válido',
    },
  },
  403: {
    default: {
      en: 'Request forbidden',
      es: 'Petición prohibida',
    },
  },
  404: {
    default: {
      en: 'Not found',
      es: 'No encontrado',
    },
    user: {
      en: 'User not found',
      es: 'Usuario no encontrado',
    },
  },
  409: {
    default: {
      en: 'Conflict',
      es: 'Conflicto',
    },
    userAlreadyExists: {
      en: 'User is already registered',
      es: 'Usuario ya está registrado',
    },
    emailAlreadyExists: {
      en: 'This email is already registered',
      es: 'Este correo ya está registrado',
    },
  },
  500: {
    default: {
      en: 'Internal server error',
      es: 'Error interno del servidor',
    },
  },
};
