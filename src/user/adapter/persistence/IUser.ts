import {Types} from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    uid: string;
    createDate: Date;
    updateDate: Date;
    availableInvitations: number;
    consumedInvitations: number;
    canInvite: boolean;
}