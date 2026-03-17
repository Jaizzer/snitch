import { Router } from 'express';
import { getUsers } from './users.handler.ts';

const router = Router();

router.get('/', getUsers);

export default router;
