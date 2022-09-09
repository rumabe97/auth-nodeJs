import {Types} from "mongoose";

export interface IUser {
    _id: string;
    uid: Types.ObjectId;
    createDate: Date;
    updateDate: Date;
    availableInvitations: number;
    consumedInvitations: number;
    canInvite: boolean;
}