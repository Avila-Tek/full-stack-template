import { User } from './user.model';

async function getUsers() {
  return User.find().exec();
}

export const userService = {
  getUsers,
};
