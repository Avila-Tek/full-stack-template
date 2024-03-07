import { z } from 'zod';
import { getFetch } from '@/lib/api';

export async function getUsers(options?: RequestInit) {
  // const schemaExample = z.object({});
  // remember use zod definition to validate the response
  try {
    const { data, response } = await getFetch({
      url: '/users',
      options,
      // schema: schemaExample,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
