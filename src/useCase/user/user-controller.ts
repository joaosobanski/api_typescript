import { Request, Response, NextFunction } from 'express';
import { TypedRequest } from '../interfaces/TypedRequest';
import IUser from './interface/IUser';
import User from './model/user.entities';
import userService from './user-service';


class UserController {
    
    public async index(req: TypedRequest<IUser>, res: Response): Promise<Response> {
        try{
            const users = await userService.findAll();
            if(users != null)
                return res.json(users);
            else
                return res.status(204).send();
        }
        catch(err)
        {
            return res.status(400).send(err);
        }
    }

    public async findByUserName(req: TypedRequest<IUser>, res: Response): Promise<Response> {
        try{
            const users = await userService.findByUserName(req.query);
            if(users.length > 0)
                return res.json(users);
            else
                return res.status(204).send();
        }
        catch(err)
        {
            return res.status(400).send(err);
        }
    }

    public async create(req: TypedRequest<IUser>, res:Response, next:NextFunction): Promise<Response> {
        try{
            const user = await User.create(req.body);
            next()
            if(user != null)
                return res.status(200).json(user);
            else
                return res.status(401).send();
        }
        catch(err)
        {
            return res.status(400).send(err);
        }
    }

    public async login(req: TypedRequest<IUser>, res:Response): Promise<Response>{
        try{
            const token = await userService.login(req.headers);
            if(token)
                return res.status(200).json({access_token: token});
            else
                return res.status(401).send();
        }
        catch(err)
        {
            return res.status(400).send(err);
        }
    }
}

export default new UserController();