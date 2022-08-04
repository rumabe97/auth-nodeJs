import {SignupService} from "../../../application/service/Signup-service";

export class SignupController {
    private signupService: SignupService;

    constructor() {
        this.signupService = new SignupService();
    }

    public signup(user: any): any {
        return this.signupService.signup(user);
    }
}