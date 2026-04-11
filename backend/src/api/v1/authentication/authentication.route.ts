import { Router } from 'express';
import { login } from './authentication.handler.ts';

const router = Router();

router.post('/login', login);

export default router;
