import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import {LoginPort} from "../port/Login-port";

export class LoginService implements LoginPort {

    private auth;

    constructor() {
        this.auth = getAuth();
    }

    login(user: any) {
        return signInWithEmailAndPassword(this.auth, user.email, user.password)
            .then((resp) => {
                return resp;
            })
            .catch((error) => {
                return {err: {code: 400, message: error}}
            });
    }
}