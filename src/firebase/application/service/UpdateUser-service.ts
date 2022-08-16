import {UpdateUserPort} from "../port/UpdateUser-port";
import {getAuth} from "firebase-admin/auth";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class UpdateUserService implements UpdateUserPort {
    constructor() {
    }

    updateUser(uid, user) {
        return getAuth()
            .updateUser(uid, user)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {code: CODE_BAD_REQUEST, message: error}}
            });
    }

}