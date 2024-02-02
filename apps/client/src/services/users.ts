import { getFetch } from '@/lib/api';

function getUsers() {
  getFetch('https://jsonplaceholder.typicode.com/todos/1', IUser);
}
