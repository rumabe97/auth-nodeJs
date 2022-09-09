import {model} from "mongoose";
import {IUser} from "../../domain/IUser";
import {userSchema} from "./UserSchema";

export const userModel = model<IUser>('user', userSchema);