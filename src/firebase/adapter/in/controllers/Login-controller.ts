import express from "express";
import {CODE_OK, CODE_TOO_MANY_REQUESTS} from "../../../../shared/enums/Errors";
import {LogInInputDto} from "../dtos/LogInInputDto";
import {LoginService} from "../../../application/service/Login-service";
import {ResponseService} from "../../../../shared/errors/ErrorService";
import {clean} from "../../../../shared/objectUtils/Clean";
import {LoginOutputDto} from "../../out/dtos/LoginOutputDto";
import {limiterConsecutiveFailsByEmail} from "../../../../shared/redis/LimiterConsecutiveFailsByEmail";

export class LoginController {
    private router;
    private loginService: LoginService;

    constructor() {
        this.router = express.Router();
        this.loginService = new LoginService();
    }

    public logIn(): any {
        return this.router.post('/', async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const logInInputDto = new LogInInputDto(req?.body);
            const rlResEmail = await limiterConsecutiveFailsByEmail.get(logInInputDto.email);

            if (rlResEmail?.consumedPoints > 3) {
                const retrySecs = Math.round(rlResEmail.msBeforeNext / 1000) || 1;
                res.set('Retry-After', String(retrySecs));
                const resp = ResponseService('Failure Request', CODE_TOO_MANY_REQUESTS, 'Too Many Requests', null);
                return res.status(statusCode).send(resp);
            }

            const data: any = await this.loginService.login(clean(logInInputDto));

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request';
                await limiterConsecutiveFailsByEmail.consume(logInInputDto.email);
            }
            if (rlResEmail.consumedPoints > 0 && !data.err) {
                await limiterConsecutiveFailsByEmail.delete(logInInputDto.email);
            }

            const resp = statusCode === CODE_OK ? new LoginOutputDto(data.user) : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        })
    }
}