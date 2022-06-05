import express from 'express';
import UserController from './user-controller';
import AuthController from '../auth';
 

const userRouter = express.Router();

userRouter.get('/', UserController.index);
userRouter.get('/s/', AuthController.authenticate, UserController.findByUserName);
userRouter.get('/login', UserController.login);
userRouter.post('/', UserController.create);


export default userRouter;