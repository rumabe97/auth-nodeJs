import {CODE_OK, CODE_TOO_MANY_REQUESTS} from "../../../../shared/enums/Errors";
import {LogInInputDto} from "../dtos/LogInInputDto";
import {LoginService} from "../../../application/service/Login-service";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {clean} from "../../../../shared/objectUtils/Clean";
import {LoginOutputDto} from "../../out/dtos/LoginOutputDto";
import {limiterConsecutiveFailsByEmail} from "../../../../shared/redis/LimiterConsecutiveFailsByEmail";
import {maxConsecutiveFailsByEmail, maxWrongAttemptsByIPperDay} from "../../../../shared/redis/values";
import {limiterSlowBruteByIP} from "../../../../shared/redis/LimiterSlowBruteByIP";
import {DefaultController} from "../../../../shared/objectUtils/DefaultController";

export class LoginController extends DefaultController {
    private loginService: LoginService;

    constructor() {
        super();
        this.loginService = new LoginService();
    }

    private getEmailIPkey(email, ip): string {
        return `${email}_${ip}`;
    }

    public logIn(): any {
        return this.router.post('/', async (req, res) => {
            this.defaultErrData();
            const logInInputDto = new LogInInputDto(req?.body);
            const emailApiKey = this.getEmailIPkey(logInInputDto.email, req.ip);
            const [rlRelSlow, rlResEmail] = await Promise.all([
                limiterSlowBruteByIP.get(emailApiKey),
                limiterConsecutiveFailsByEmail.get(logInInputDto.email),
            ]);

            if (this.checkLimiter(rlRelSlow, res, maxWrongAttemptsByIPperDay)) return;
            if (this.checkLimiter(rlResEmail, res, maxConsecutiveFailsByEmail)) return;

            const data: any = await this.loginService.login(clean(logInInputDto));

            try {
                if (data.err) {
                    this.setErrData(data.err);
                    const promises = [];
                    promises.push(limiterConsecutiveFailsByEmail.consume(logInInputDto.email));
                    promises.push(limiterSlowBruteByIP.consume(emailApiKey));
                    await Promise.all(promises);
                }
                if (rlResEmail.consumedPoints > 0 && !data.err) await limiterConsecutiveFailsByEmail.delete(logInInputDto.email);
                const resp = this.err.statusCode === CODE_OK ? new LoginOutputDto(data.user) : ErrResponseService(this.err);
                return res.status(this.err.statusCode).send(resp);
            } catch (rlRejected) {
                if (rlRejected instanceof Error) {
                    throw rlRejected;
                } else {
                    const retrySecs = Math.round(rlRejected.msBeforeNext / 1000) || 1;
                    res.set('Retry-After', String(retrySecs));
                    this.setErrData({statusCode: CODE_TOO_MANY_REQUESTS, message: 'User is blocked'}, 'Too Many Requests')
                    const resp = ErrResponseService(this.err);
                    res.status(CODE_TOO_MANY_REQUESTS).send(resp);
                }
            }
        })
    }

    private checkLimiter(limiter, res, max) {
        if (limiter?.consumedPoints > max) {
            const retrySecs = Math.round(limiter.msBeforeNext / 1000) || 1;
            res.set('Retry-After', String(retrySecs));
            this.setErrData({code: CODE_TOO_MANY_REQUESTS, message: 'User is blocked'}, 'Too Many Requests')
            const resp = ErrResponseService(this.err);
            res.status(CODE_TOO_MANY_REQUESTS).send(resp);
            return true;
        }
        return false;
    }
}