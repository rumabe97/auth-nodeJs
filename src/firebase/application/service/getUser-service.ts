import {getAuth} from "firebase-admin/auth";
import {GetUserPort} from "../port/getUser-port";

export class GetUserService implements GetUserPort {

    constructor() {
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

    getUserByEmail(email: string) {
        return getAuth()
            .getUserByEmail(email)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {code: 400, message: error}};
            });
    }

    getUserByPhoneNumber(phoneNumber: string) {
        return getAuth()
            .getUserByPhoneNumber(phoneNumber)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {code: 400, message: error}};
            });
    }
}