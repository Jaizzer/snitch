import { prisma } from '../database/prismaClient.ts';

export default async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: { email },
	});
	return user;
}
