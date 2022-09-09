import {Schema} from 'mongoose';
import {IUser} from "../../domain/IUser";

export const userSchema = new Schema<IUser>({
        _id: {type: String},
        uid: {type: Schema.Types.ObjectId, required: true},
        availableInvitations: {type: Number, default: 0, min: 0, max: 10},
        consumedInvitations: {type: Number, default: 0, min: 0},
        canInvite: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
);