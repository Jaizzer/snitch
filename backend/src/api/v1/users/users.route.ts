import { Router } from 'express';
import { createUser, getUser, updateUser } from './users.handler.ts';
import authorize from '../../../middleware/authorization/authorization.handler.ts';

const router = Router();

router.post('/', createUser);
router.get('/:id', authorize, getUser);
router.put('/:id', authorize, updateUser);

export default router;
