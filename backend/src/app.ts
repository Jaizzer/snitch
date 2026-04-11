import express from 'express';
import userRoutes from './api/v1/users/users.route.ts';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/users', userRoutes);

export default app;
