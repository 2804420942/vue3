import express from 'express';
import { getAllUsers } from './user_ctrl.js';

const router = new express.Router();

router.get('/user', getAllUsers);

export default router;
