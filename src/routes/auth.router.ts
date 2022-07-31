import express from 'express';

// import { Container } from 'typedi';

import AuthController from '../controllers/auth.controller';
import isAuthMiddleware from '../middlewares/isAuth.middleware';
import AuthService from '../services/auth.service';

const router = express.Router();

// const controller = Container.get(AuthController);

const controller = new AuthController(new AuthService());

router.post('/register', controller.registerUser.bind(controller));
router.post('/login', controller.login.bind(controller));
router.get('/logout', isAuthMiddleware, controller.logout.bind(controller));

export default router;
