import { z } from 'zod';

export const ZUser = z.object({
  email: z.string().email().nonempty(),
});

export type TUser = z.infer<typeof ZUser>;
