import {userSchema} from "./UserSchema";
import {model} from "mongoose";

export const UserModel = model('User', userSchema);