import express from "express";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";
import {ResponseService} from "../../../../shared/errors/ErrorService";
import {SignupInputDto} from "../dtos/SignupInputDto";
import {UpdateUserService} from "../../../application/service/UpdateUser-service";
import {isOwner} from "../../../../shared/middleware/IsOwner";

export class UpdateUserController {
    private router;
    private updateUserService: UpdateUserService;

    constructor() {
        this.router = express.Router();
        this.updateUserService = new UpdateUserService();
    }

    public updateUser(): any {
        return this.router.put('/:uid', isOwner, async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const user = new SignupInputDto(req.body);
            const data: any = await this.updateUserService.updateUser(req.params.uid,user);

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request'
            }
            const resp = statusCode === CODE_OK ? new SignupOutputDto(data) : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        });
    }
}