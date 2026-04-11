import express from 'express';
import type { Response, Request } from 'express';
import userRoutes from './api/v1/users/users.route.ts';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello world 7');
});

app.use('/api/v1/users', userRoutes);

export default app;
