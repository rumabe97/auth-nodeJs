import {IUser} from "./IUser";
import {Schema} from "mongoose";

export const userSchema = new Schema<IUser>({
        uid: {type: String, required: true},
        availableInvitations: {type: Number, default: 0, min: 0, max: 10},
        consumedInvitations: {type: Number, default: 0, min: 0},
        canInvite: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
);