import {Schema, model} from 'mongoose';
import IUser from '../interface/IUser';

const UserSchema = new Schema({
    email:String,
    username:String,
    password:String
    // use password? :String when receive null 
},{
    timestamps:true
})

export default model<IUser>('User', UserSchema);