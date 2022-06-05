import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './useCase/user/user-router';
import dotenv from 'dotenv';
dotenv.config();

class App {
    public express: express.Application;
    
    public constructor(){
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private database():void {
        mongoose.connect(process.env.API_DATABASE);
    }

    private routes(): void {
        this.express.use('/users', userRouter);
    }
}

export default new App().express;