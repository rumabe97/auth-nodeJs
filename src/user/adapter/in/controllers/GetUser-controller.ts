import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {GetUserService} from "../../../application/services/GetUser-service";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {UserOutputDto} from "../../out/dtos/UserOutputDto";

export class GetUserController extends DefaultController {
    private getUserService: GetUserService;

    constructor() {
        super();
        this.getUserService = new GetUserService();
    }

    public getUserByUid(): any {
        return this.router.get('/byUid/:uid', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.getUserService.getUserByUid(req.params.uid);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new UserOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }

    public getUserById(): any {
        return this.router.get('/:id', authenticate, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.getUserService.getUserById(req.params.id);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new UserOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        })
    }
}