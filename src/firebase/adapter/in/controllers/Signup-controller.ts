import {SignupService} from "../../../application/service/Signup-service";
import {SignupInputDto} from "../dtos/SignupInputDto";
import express, {Router} from "express";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {clean} from "../../../../shared/objectUtils/Clean";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";
import {ResponseService} from "../../../../shared/errors/ErrorService";
import {CreateUserService} from "../../../../user/application/services/CreateUser-service";
import {User} from "../../../../user/domain/User";

export class SignupController {
    private signupService: SignupService;
    private createUserService: CreateUserService;
    private router: Router;

    constructor() {
        this.signupService = new SignupService();
        this.createUserService = new CreateUserService();
        this.router = express.Router();
    }

    public signup(): any {
        return this.router.post("/", async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';

            const signupInputDto: SignupInputDto = new SignupInputDto(req.body);
            const data: any = await this.signupService.signup(clean(signupInputDto));
            let userData: any;
            if (!data.err) {
                const user: User = new User(data);
                user.canInvite = data.emailVerified && !data.disabled;
                userData = await this.createUserService.createUser(user);
            }
            if (data.err || userData.err) {
                statusCode = data.err?.code ?? userData.err?.code;
                message = data.err?.message ?? userData.err?.message;
                status = 'Failure Request'
            }
            const resp = statusCode === CODE_OK ? new SignupOutputDto({...data, user:userData}) :
                ResponseService(status, statusCode, message, data.err || userData.err ? null : data);
            return res.status(statusCode).send(resp);
        })
    }
}