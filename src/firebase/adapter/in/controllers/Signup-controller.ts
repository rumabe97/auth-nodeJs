import {SignupService} from "../../../application/service/Signup-service";
import {SignupInputDto} from "../dtos/SignupInputDto";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {clean} from "../../../../shared/objectUtils/Clean";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {SaveUserService} from "../../../../user/application/services/SaveUser-service";
import {User} from "../../../../user/domain/User";
import {DefaultController} from "../../../../shared/objectUtils/DefaultController";

export class SignupController extends DefaultController {
    private signupService: SignupService;
    private createUserService: SaveUserService;

    constructor() {
        super();
        this.signupService = new SignupService();
        this.createUserService = new SaveUserService();
    }

    public signup(): any {
        return this.router.post("/", async (req, res) => {
            this.defaultErrData();
            const signupInputDto: SignupInputDto = new SignupInputDto(req.body);
            const data: any = await this.signupService.signup(clean(signupInputDto));
            let userData: any;
            if (!data.err) {
                const user: User = new User(data);
                user.canInvite = data.emailVerified && !data.disabled;
                userData = await this.createUserService.saveUser(user);
            }
            if (data.err || userData.err) this.setErrData(data.err ?? userData.err);
            const resp = this.err.statusCode === CODE_OK ? new SignupOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }
}