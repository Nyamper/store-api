import express = require('express');

import UsersController from '../controllers/users.controller';
import UserService from '../services/user.service';

const router = express.Router();

const userController = new UsersController(new UserService());

router.post('/', userController.createUser.bind(userController));

export default router;
