import bcrypt from 'bcryptjs';

async function hash(password: string) {
	return await bcrypt.hash(password, 10);
}

async function isMatched({
	password,
	hashedPassword,
}: {
	password: string;
	hashedPassword: string;
}) {
	return await bcrypt.compare(password, hashedPassword);
}

export default { hash, isMatched };
