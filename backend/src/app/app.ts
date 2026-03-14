import express from 'express';
import type { Response, Request } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello world 7');
});

app.get('/tets', (req: Request, res: Response) => {
	res.status(200).send('test 1');
});

export default app;
