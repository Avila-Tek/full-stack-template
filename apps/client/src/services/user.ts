import { getFetch } from '@/lib/api';

export async function getUsers() {
  // USE ZOD TO VALIDATE THE RESPONSE IN SECOND ARGUMENT
  return await getFetch('/todos/1');
}
