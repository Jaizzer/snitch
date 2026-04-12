import { prisma } from '../../../database/prismaClient.ts';
import passwordManager from '../../../utils/passwordManager.ts';

async function isLoginCredentialsValid({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	const isEmailExistent = user;

	// Only check the password if the email exists in the database
	let isPasswordCorrect = false;
	if (isEmailExistent) {
		isPasswordCorrect = await passwordManager.compare({
			password: password,
			hash: user.password,
		});
	}

	return isEmailExistent && isPasswordCorrect;
}

export default { isLoginCredentialsValid };
