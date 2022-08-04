import {SignupPort} from "../port/Signup-port";
import {getAuth} from "firebase-admin/auth";

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
                return 'Error creating new user:' + error;
            });
    }

}