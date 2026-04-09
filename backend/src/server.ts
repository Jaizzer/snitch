import app from './routes.ts';
import config from './config/env.ts';

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}...`);
});
