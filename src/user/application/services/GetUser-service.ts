import {GetUserPort} from "../port/GetUserPort";
import {UserModel} from "../../adapter/persistence/UserModel";
import {CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND} from "../../../shared/enums/Errors";

export class GetUserService implements GetUserPort {
    getUserByUid(uid: string) {
        return UserModel.findOne({uid}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with uid ' + uid}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

    getUserById(_id: string) {
        return UserModel.findOne({_id}).then(r => {
            if (!r) return {err: {statusCode: CODE_NOT_FOUND, message: 'User not found with id ' + _id}}
            return r;
        }).catch((error) => {
            return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}};
        });
    }

}