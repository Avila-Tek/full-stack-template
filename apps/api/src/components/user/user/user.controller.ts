import { schemaComposer } from 'graphql-compose';
import { buildPaginationType } from '../../../utils';
import {
  CreateOneUserInput,
  UserFindManyFilterInput,
  UserFindManySortInput,
  UserFindOneFilterInput,
  UserFindOneSortInput,
  UserType,
  UserTypePlural,
  UserUpdateOneFilterInput,
  UserUpdateOneInput,
} from './user.dto';
import * as userService from './user.service';

interface UserQueryArgs {
  filter: any;
  skip: number;
  sort: any;
}

const user = schemaComposer.createResolver<any, UserQueryArgs>({
  name: 'user',
  kind: 'query',
  type: UserType,
  args: {
    filter: UserFindOneFilterInput,
    skip: 'Int',
    sort: UserFindOneSortInput,
  },
  description: 'Find one user',
  async resolve({ args, context, info, projection, source }) {
    // TODO: Fix the sort issue
    const _user = await userService.findOne(
      args.filter,
      {},
      { skip: args.skip ?? 0 }
    );
    return _user;
  },
});

interface UsersQueryArgs {
  filter: any;
  skip: number;
  limit: number;
  sort: any;
}

const users = schemaComposer.createResolver<any, UsersQueryArgs>({
  name: 'users',
  kind: 'query',
  type: UserTypePlural,
  args: {
    filter: UserFindManyFilterInput,
    skip: 'Int',
    limit: 'Int',
    sort: UserFindManySortInput,
  },
  description: 'Find many users',
  async resolve({ args, context, info, projection, source }) {
    // TODO: Fix the sort issue
    const _user = await userService.find(
      args.filter,
      {},
      { skip: args.skip ?? 0 }
    );
    return _user;
  },
});

interface UserPaginationQueryArgs {
  filter: any;
  page: number;
  perPage: number;
  sort: any;
}

const userPagination = schemaComposer.createResolver<
  any,
  UserPaginationQueryArgs
>({
  name: 'userPagination',
  kind: 'query',
  type: buildPaginationType(UserType),
  description: 'Find many users with pagination',
  args: {
    filter: UserFindManyFilterInput,
    page: 'Int!',
    perPage: 'Int!',
    sort: UserFindManySortInput,
  },
  async resolve({ args, context, info, projection, source }) {
    // TODO: Fix the sort issue
    const pagination = userService.pagination(
      args.page,
      args.perPage,
      args.filter,
      {},
      {}
    );
    return pagination;
  },
});

interface CreateUserMutationArgs {
  data: any;
}

const createUser = schemaComposer.createResolver<any, CreateUserMutationArgs>({
  name: 'createUser',
  kind: 'mutation',
  type: UserType,
  description: 'Create one user',
  args: {
    data: CreateOneUserInput,
  },
  async resolve({ args, context, info, projection, source }) {
    const _user = await userService.create(args.data);
    return _user;
  },
});

interface UpdateUserMutationArgs {
  data: any;
  filter: any;
}

const updateUser = schemaComposer.createResolver<any, UpdateUserMutationArgs>({
  name: 'updateUser',
  kind: 'mutation',
  type: UserType,
  description: 'Update one user',
  args: {
    data: UserUpdateOneFilterInput,
    filter: UserUpdateOneInput,
  },
  async resolve({ args, context, info, projection, source }) {
    const _user = await userService.updateOne(args.filter, args.data, {
      new: true,
      runValidators: true,
    });
    return _user;
  },
});

const userQueries = {
  user,
  users,
  userPagination,
};

const userMutations = {
  createUser,
  updateUser,
};

export { userQueries, userMutations };
