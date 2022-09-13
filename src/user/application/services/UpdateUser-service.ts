import {UpdateUserPort} from "../port/UpdateUser-port";
import {User} from "../../domain/User";
import {UserModel} from "../../adapter/persistence/UserModel";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";

export class UpdateUserService implements UpdateUserPort {
    updateUser(user: User) {
        return UserModel.findOneAndUpdate({_id: user._id}, user, {returnOriginal: false}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with id ' + user._id}};
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}}
        });
    }

    updateUserByUid(uid: string, canInviteValue: boolean) {
        return UserModel.findOneAndUpdate({uid: uid}, {canInvite: canInviteValue}, {returnOriginal: false}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with uid ' + uid}};
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}}
        });
    }
}