import express from 'express';
import {me, login, logout} from '../controllers/auth.js';

const router = express.Router();

router.get('/me', me);
router.post('/login', login);
router.delete('/logout', logout)

export default router;