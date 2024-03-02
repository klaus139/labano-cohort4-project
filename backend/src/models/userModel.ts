import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    email:string;
    password:string;
    firstname:string;
    lastname:string;
    salt?:string;
    verified:boolean;
    isAdmin:boolean;
}

const userSchema: Schema<IUser> = new Schema({
  email:{ type:String, required: true, unique: true },
  password:{ type:String, required: true },
  firstname:{ type:String, required: true },
  lastname:{ type:String, required: true },
  salt:{ type:String },
  verified:{ type:Boolean, default: false },
  isAdmin:{ type:Boolean, default:false },
}, { timestamps: true })

const User = mongoose.model<IUser>("User", userSchema);

export default User;
