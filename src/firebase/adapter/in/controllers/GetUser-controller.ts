import express, {Router} from "express";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ResponseService} from "../../../../shared/errors/ErrorService";
import {GetUserService} from "../../../application/service/GetUser-service";
import {authenticate} from "../../../../shared/middleware/IsAuthenticate";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";

export class GetUserController {
    private router: Router;
    private getUserService: GetUserService;

    constructor() {
        this.router = express.Router();
        this.getUserService = new GetUserService();
    }

    public getUserByUid(): any {
        return this.router.get('/:uid', authenticate, async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const data: any = await this.getUserService.getUserByUid(req.params.uid);

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request'
            }
            const resp = statusCode === CODE_OK ? new SignupOutputDto(data) : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        })
    }

    public getUserByEmail(): any {
        return this.router.get('/byEmail/:email', authenticate, async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const data: any = await this.getUserService.getUserByEmail(req.params.email);

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request'
            }
            const resp = statusCode === CODE_OK ? new SignupOutputDto(data) : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        })
    }
    public getUserByPhoneNumber(): any {
        return this.router.get('/byPhoneNumber/:phoneNumber', authenticate, async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const data: any = await this.getUserService.getUserByPhoneNumber(req.params.phoneNumber);

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request'
            }
            const resp = statusCode === CODE_OK ? new SignupOutputDto(data) : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        })
    }
}