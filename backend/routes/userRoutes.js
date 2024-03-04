import express from 'express';
import {
    registerUser,
    loginUser,
    getUserDataById,
    applyAsCustomer,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/userdata-by-id', authMiddleware, getUserDataById);
router.post('/apply-customer-profile', authMiddleware, applyAsCustomer);

export default router;