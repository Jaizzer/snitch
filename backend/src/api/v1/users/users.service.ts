import { prisma } from '../../../database/prismaClient.ts';

interface UserRegistrationInfo {
	email: string;
	hashedPassword: string;
}

async function createUser(userRegistrationInfo: UserRegistrationInfo) {
	const user = await prisma.user.create({ data: userRegistrationInfo });
	return user;
}

export default { createUser };
