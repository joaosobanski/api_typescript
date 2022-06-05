import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import IUser from './user/interface/IUser'; 

class AuthController {
    public async authenticate(req:Request, res:Response, next:NextFunction) {
        try {
            const [, token] = req.headers.authorization.split(' ');
            jwt.verify(token, process.env.API_SECRET);
            next()
        } catch (error) {
            res.status(401).send(error);
        }
    }
    
    public async sign(user:IUser){
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        }
        return jwt.sign(payload,process.env.API_SECRET,{expiresIn: '3600s'});
    }

    public getUserId(req: Request){
        const [, token] = req.headers.authorization.split(' ')
        const { payload } = jwt.decode(token , { complete: true });
        return payload._id;
    }

}

export default new AuthController();