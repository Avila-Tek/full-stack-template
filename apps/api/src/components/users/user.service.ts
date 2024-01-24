import { User } from '@/components/users/user.model';

async function findOne(args: any) {
  return User.findOne({ ...args });
}

async function findAll(args: any) {
  return User.find({ ...args });
}

export const userService = Object.freeze({
  findOne,
  findAll,
});
