import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {LoginPort} from "../port/Login-port";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class LoginService implements LoginPort {

    private auth;

    constructor() {
    }

    login(user: any) {
        if (!this.auth) this.auth = getAuth();
        return signInWithEmailAndPassword(this.auth, user.email, user.password)
            .then((resp) => {
                return resp;
            })
            .catch((error) => {
                return {err: {code: CODE_BAD_REQUEST, message: error}}
            });
    }
}