import { z } from 'zod';

const UserInfoSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export { UserInfoSchema };
