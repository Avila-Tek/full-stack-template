import { getFetch } from '@/lib/api';
import { z } from 'zod';

export async function getUsers(options?: RequestInit) {
  const schemaExample = z.object({});
  // remember use zod definition
  try {
    const { data, response } = await getFetch({
      url: '/users',
      options,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
