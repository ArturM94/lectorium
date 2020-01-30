import express, { Router } from 'express';

import { AuthController } from '@controllers/auth';

export const AuthRouter: Router = express.Router();
const authController: AuthController = new AuthController();

AuthRouter.post('/registration', authController.registration);
AuthRouter.post('/login', authController.login);
