import {Types} from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    uid: string;
    createdAt: Date;
    updatedAt: Date;
    availableInvitations: number;
    consumedInvitations: number;
    canInvite: boolean;
}