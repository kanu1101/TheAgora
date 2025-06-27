import express from "express";
import { updateProfile, login, logout, signup, checkAuth } from "../controllers/auth.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js"
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.put('/updateProfile', protectRoute, updateProfile);
router.get('/checkAuth', protectRoute, checkAuth);


export default router;