import express, {Router} from "express";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ResponseService} from "../../../../shared/errors/ErrorService";
import {DeleteUserService} from "../../../application/service/DeleteUser-service";
import {isOwner} from "../../../../shared/middleware/IsOwner";

export class DeleteUserController {
    private router: Router;
    private deleteUserService: DeleteUserService;

    constructor() {
        this.router = express.Router();
        this.deleteUserService = new DeleteUserService();
    }

    public deleteUser(){
        return this.router.delete('/:uid', isOwner, async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const data: any = await this.deleteUserService.deleteUser(req.params.uid);

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request'
            }
            const resp = statusCode === CODE_OK ? data : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        });
    }
}