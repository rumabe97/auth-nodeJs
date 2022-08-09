import {SignupService} from "../../../application/service/Signup-service";
import {SignupInputDto} from "../dtos/SignupInputDto";
import express from "express";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {clean} from "../../../../shared/objectUtils/Clean";
import {SignupOutputDto} from "../../out/dtos/SignupOutputDto";
import {ResponseService} from "../../../../shared/errors/ErrorService";

export class SignupController {
    private signupService: SignupService;
    private router:any;

    constructor() {
        this.signupService = new SignupService();
        this.router = express.Router();
    }

    public signup(): any {
        return this.router.post("/", async (req, res) => {
            let status = 'Success Request', statusCode = CODE_OK, message = '';

            const signupInputDto: SignupInputDto = new SignupInputDto(req.body);
            const data:any = await this.signupService.signup(clean(signupInputDto));
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