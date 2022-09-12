import {CODE_OK} from "../../../../shared/enums/Errors";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {SignupInputDto} from "../dtos/SignupInputDto";
import {UpdateUserService} from "../../../application/service/UpdateUser-service";
import {isOwner} from "../../../../shared/middleware/IsOwner";
import {DefaultController} from "../../../../shared/objectUtils/DefaultController";

export class UpdateUserController extends DefaultController {
    private updateUserService: UpdateUserService;

    constructor() {
        super();
        this.updateUserService = new UpdateUserService();
    }

    public updateUser(): any {
        return this.router.put('/:uid', isOwner, async (req, res) => {
            this.defaultErrData();
            const user = new SignupInputDto(req.body);
            const data: any = await this.updateUserService.updateUser(req.params.uid, user);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new SignupOutputDto(data) : ErrResponseService(data.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }
}