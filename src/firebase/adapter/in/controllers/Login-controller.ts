import express, {Router} from "express";
import {CODE_OK, CODE_TOO_MANY_REQUESTS} from "../../../../shared/enums/Errors";
import {LogInInputDto} from "../dtos/LogInInputDto";
import {LoginService} from "../../../application/service/Login-service";
import {ResponseService} from "../../../../shared/errors/ErrorService";
import {clean} from "../../../../shared/objectUtils/Clean";
import {LoginOutputDto} from "../../out/dtos/LoginOutputDto";
import {limiterConsecutiveFailsByEmail} from "../../../../shared/redis/LimiterConsecutiveFailsByEmail";
import {maxConsecutiveFailsByEmail, maxWrongAttemptsByIPperDay} from "../../../../shared/redis/values";
import {limiterSlowBruteByIP} from "../../../../shared/redis/LimiterSlowBruteByIP";

export class LoginController {
    private router: Router;
    private loginService: LoginService;

    constructor() {
        this.router = express.Router();
        this.loginService = new LoginService();
    }

    private getEmailIPkey(email, ip): string {
        return `${email}_${ip}`;
    }

    public logIn(): any {
        return this.router.post('/', async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';
            const logInInputDto = new LogInInputDto(req?.body);
            const emailApiKey = this.getEmailIPkey(logInInputDto.email,req.ip);
            const [rlRelSlow, rlResEmail] = await Promise.all([
                limiterSlowBruteByIP.get(emailApiKey),
                limiterConsecutiveFailsByEmail.get(logInInputDto.email),
            ]);

            if (rlRelSlow?.consumedPoints > maxWrongAttemptsByIPperDay) {
                const retrySecs = Math.round(rlRelSlow.msBeforeNext / 1000) || 1;
                res.set('Retry-After', String(retrySecs));
                const resp = ResponseService('Too Many Requests', CODE_TOO_MANY_REQUESTS, 'User is blocked', null);
                return res.status(CODE_TOO_MANY_REQUESTS).send(resp);
            }

            if (rlResEmail?.consumedPoints > maxConsecutiveFailsByEmail || rlRelSlow?.consumedPoints > maxWrongAttemptsByIPperDay) {
                const retrySecs = Math.round(rlResEmail.msBeforeNext / 1000) || 1;
                res.set('Retry-After', String(retrySecs));
                const resp = ResponseService('Too Many Requests', CODE_TOO_MANY_REQUESTS, 'User is blocked', null);
                return res.status(CODE_TOO_MANY_REQUESTS).send(resp);
            }

            const data: any = await this.loginService.login(clean(logInInputDto));

            if (data.err) {
                statusCode = data.err.code;
                message = data.err.message;
                status = 'Failure Request';
                const promises = [];
                promises.push(limiterConsecutiveFailsByEmail.consume(logInInputDto.email));
                promises.push(limiterSlowBruteByIP.consume(emailApiKey));
                await Promise.all(promises);

            }
            if (rlResEmail.consumedPoints > 0 && !data.err) {
                await limiterConsecutiveFailsByEmail.delete(logInInputDto.email);
            }
            const resp = statusCode === CODE_OK ? new LoginOutputDto(data.user) : ResponseService(status, statusCode, message, data.err ? null : data);
            return res.status(statusCode).send(resp);
        })
    }
}