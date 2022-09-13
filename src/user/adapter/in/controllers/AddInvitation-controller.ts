import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {GetUserService} from "../../../application/services/GetUser-service";
import {User} from "../../../domain/User";
import {CODE_BAD_REQUEST, CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {UpdateUserService} from "../../../application/services/UpdateUser-service";
import {UserOutputDto} from "../../out/dtos/UserOutputDto";

export class AddInvitationController extends DefaultController {
    private updateUserService: UpdateUserService;
    private getUser: GetUserService;

    constructor() {
        super();
        this.updateUserService = new UpdateUserService();
        this.getUser = new GetUserService();
    }

    public addInvitation() {
        return this.router.patch('/:uid', authenticate, async (req, res) => {
            this.defaultErrData();
            const userData = await this.getUser.getUserByUid(req.params.uid) as any;
            if (userData.err) {
                this.setErrData(userData.err);
                const resp = ErrResponseService(this.err);
                return res.status(this.err.statusCode).send(resp);
            }

            const user = new User(userData);

            if (user.availableInvitations >= 10) {
                const resp = ErrResponseService({
                    status: 'Failure Request',
                    statusCode: CODE_BAD_REQUEST,
                    message: 'Maximum number of invitations reached'
                });
                return res.status(CODE_BAD_REQUEST).send(resp);
            }
            user.availableInvitations++;
            const data = await this.updateUserService.updateUser(user) as any;
            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? new UserOutputDto({
                ...data,
                availableInvitations: data.availableInvitations + 1
            }) : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }
}