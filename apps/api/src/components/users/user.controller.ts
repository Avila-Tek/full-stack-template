import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/components/users/user.service';
import { UserTC } from '@/components/users/user.model';

export const userQueries = Object.freeze({
  user: UserTC.mongooseResolvers.findOne(),
});

export const userMutations = Object.freeze({});
