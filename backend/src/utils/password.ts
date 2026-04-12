import bcrypt from 'bcryptjs';

async function hash(password: string) {
	return await bcrypt.hash(password, 10);
}

async function isMatched({
	password,
	hash,
}: {
	password: string;
	hash: string;
}) {
	return await bcrypt.compare(password, hash);
}

export default { hash, isMatched };
