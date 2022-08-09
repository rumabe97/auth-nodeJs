import {SignupService} from "../../../application/service/Signup-service";
import {SignupInputDto} from "../dtos/SignupInputDto";

export class SignupController {
    private signupService: SignupService;

    constructor() {
        this.signupService = new SignupService();
    }

    public signup(user: SignupInputDto): any {
        return this.signupService.signup(user);
    }
}