import express from 'express';
import type { Response, Request } from 'express';
import userRoutes from '../api/v1/users/users.route.ts';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello world 7');
});

app.get('/tets', (req: Request, res: Response) => {
	res.status(200).send('test 1');
});

app.use('/api/v1/users', userRoutes);

export default app;
