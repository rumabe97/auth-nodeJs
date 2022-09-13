import {User} from "../../domain/User";

export interface UpdateUserPort {
    updateUser(user: User);

    updateUserByUid(uid: string, canInviteValue: boolean);
}