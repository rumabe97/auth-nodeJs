import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {UpdateUserService} from "../../../application/services/UpdateUser-service";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import {UserOutputDto} from "../../out/dtos/UserOutputDto";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";

export class UpdateCanInviteController extends DefaultController {
    private updateUserService: UpdateUserService;

    constructor() {
        super();
        this.updateUserService = new UpdateUserService();
    }

    public updateCanInvite() {
        return this.router.patch('/:uid', authenticate, async (req, res) => {
            this.defaultErrData();

            if (req.body.canInvite === null || req.body.canInvite === undefined) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Can invite value is required'
                });
                return res.status(this.err.statusCode).send(resp);
            }
            const data = await this.updateUserService.updateUserByUid(req.params.uid, req.body.canInvite) as any;
            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new UserOutputDto(data) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }
}