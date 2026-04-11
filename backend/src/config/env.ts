import dotenv from 'dotenv';
dotenv.config({ path: import.meta.dirname + '/../../.env' });

const nodeEnv = process.env.NODE_ENV ?? 'development';

let databaseUrl;
if (nodeEnv === 'production') {
	databaseUrl =
		process.env.PRODUCTION_DATABASE_URL ??
		'Missing Production Database URL';
} else if (nodeEnv === 'development') {
	databaseUrl =
		process.env.DEVELOPMENT_DATABASE_URL ??
		'Missing Development Database URL';
} else {
	databaseUrl = process.env.TEST_DATABASE_URL ?? 'Missing Test Database URL';
}

const config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: nodeEnv,
	databaseUrl: databaseUrl,
	jwtSecret: process.env.JWT_SECRET ?? 'secret',
};

export default config;
