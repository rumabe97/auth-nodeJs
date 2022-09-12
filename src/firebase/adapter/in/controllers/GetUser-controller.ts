import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {GetUserService} from "../../../application/service/GetUser-service";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";
import {DefaultController} from "../../../../shared/objectUtils/DefaultController";

export class GetUserController extends DefaultController {
    private getUserService: GetUserService;

    constructor() {
        super();
        this.getUserService = new GetUserService();
    }

    public getUserByUid(): any {
        return this.router.get('/:uid', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.getUserService.getUserByUid(req.params.uid);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new SignupOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }

    public getUserByEmail(): any {
        return this.router.get('/byEmail/:email', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.getUserService.getUserByEmail(req.params.email);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new SignupOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }

    public getUserByPhoneNumber(): any {
        return this.router.get('/byPhoneNumber/:phoneNumber', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.getUserService.getUserByPhoneNumber(req.params.phoneNumber);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new SignupOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }
}