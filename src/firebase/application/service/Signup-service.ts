import {SignupPort} from "../port/Signup-port";
import {getAuth} from "firebase-admin/auth";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class SignupService implements SignupPort {

    constructor() {
    }

    signup(user: any) {
        return getAuth()
            .createUser(user)
            .then((userRecord) => {
                return userRecord;
            })
            .catch((error) => {
                return {err: {code: CODE_BAD_REQUEST, message: error}}
            });
    }
}