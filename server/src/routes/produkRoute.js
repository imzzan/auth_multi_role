import express from 'express';
import {getProduk, getProdukById, createProduk, updateProduk, deleteProduk} from '../controllers/produk.js';
import { verifyUser } from '../middleware/authUser.js';

const router = express.Router();

router.get('/produk', verifyUser, getProduk);
router.get('/produk/:id', verifyUser, getProdukById);
router.post('/produk', verifyUser, createProduk);
router.patch('/produk/:id', verifyUser, updateProduk);
router.delete('/produk/:id', verifyUser, deleteProduk);

export default router;