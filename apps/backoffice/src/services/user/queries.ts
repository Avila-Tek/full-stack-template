import { getFetch } from '@/lib/api';
export async function getUsers(options?: RequestInit) {
  // remember use zod definition
  return getFetch({
    url: '/users',
    options,
  });
}
