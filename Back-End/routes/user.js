import express from 'express';
import authenticateUser from '../midllerware/athorzMiddleware.js';
import { userLogin, userSignUp } from '../controller/user.js';

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);

export const userRouter = router;