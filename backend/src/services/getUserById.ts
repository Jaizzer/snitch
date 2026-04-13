import { prisma } from '../database/prismaClient.ts';

export default async function getUserById(id: string) {
	const user = await prisma.user.findUnique({
		where: { id },
	});
	return user;
}
