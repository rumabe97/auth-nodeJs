import {getAuth} from "firebase-admin/auth";
import {GetUserPort} from "../port/getUser-port";

export class GetUserService implements GetUserPort {

    constructor() {
    }

    signup(user: any) {
        return getAuth()
            .createUser(user)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {code: 400, message: error}};
            });
    }

    getUserByUid(uid: string) {
        return getAuth()
            .getUser(uid)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {code: 400, message: error}};
            });
    }
}