import express from 'express';
import type { Response, Request } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello world 2');
});

export default app;
