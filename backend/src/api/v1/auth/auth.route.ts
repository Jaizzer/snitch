import { Router } from 'express';
import { login } from './auth.handler.ts';

const router = Router();

router.post('/login', login);

export default router;
