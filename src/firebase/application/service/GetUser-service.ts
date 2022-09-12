import {getAuth} from "firebase-admin/auth";
import {GetUserPort} from "../port/GetUser-port";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

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
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}};
            });
    }

    getUserByEmail(email: string) {
        return getAuth()
            .getUserByEmail(email)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}};
            });
    }

    getUserByPhoneNumber(phoneNumber: string) {
        return getAuth()
            .getUserByPhoneNumber(phoneNumber)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {statusCode: CODE_BAD_REQUEST, message: error}};
            });
    }
}