import User from './model/user.entities';
import jwt from 'jsonwebtoken';
import IUser from './interface/IUser';
import { Model } from 'mongoose';
import AuthController from '../auth';

class UserService {
    public async findAll(){
        const users = await User.find();
        return users;
    }

    public async findByUserName(us: IUser){
        const users = await User.find({username: us.username});
        return users;
    }

    public async login(us: IUser){
        const user = await User.findOne({email: us.email});
        if(user.password == us.password){
            return AuthController.sign(us);
        }
        else
            return null;
    }

}

export default new UserService();