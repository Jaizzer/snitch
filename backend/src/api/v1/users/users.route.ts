import { Router } from 'express';
import { createUser, getUser } from './users.handler.ts';
import authorize from '../../../middleware/authorization/authorization.handler.ts';

const router = Router();

router.post('/', createUser);
router.get('/:id', authorize, getUser);

export default router;
