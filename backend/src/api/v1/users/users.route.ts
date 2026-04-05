import { Router } from 'express';
import { createUser } from './users.handler.ts';

const router = Router();

router.post('/', createUser);

export default router;
