import dotenv from 'dotenv';
dotenv.config({ path: import.meta.dirname + '/../../.env' });

const config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV ?? 'development',
	databaseUrl: process.env.DATABASE_URL ?? 'MISSING DATABASE URL',
	jwtSecret: process.env.JWT_SECRET ?? 'secret',
};

export default config;
