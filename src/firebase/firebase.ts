import express from 'express';
import {SignupController} from "./adapter/in/controllers/Signup-controller";
import {initializeApp, cert} from 'firebase-admin/app';
import {SignupInputDto} from "./adapter/in/dtos/SignupInputDto";
import {SignupOutputDto} from "./adapter/out/dtos/SignupOutputDto";
import {ResponseService} from "../shared/errors/ErrorService";
import {CODE_OK} from "../shared/enums/Errors";

const GOOGLE_APPLICATION_CREDENTIALS = '/home/ruben/Escritorio/githubProyects/auth-nodeJs/serviceAccountKey.json';

initializeApp({
    credential: cert(GOOGLE_APPLICATION_CREDENTIALS),
    projectId: 'auth-twenti',
})


const router = express.Router();
const signupController = new SignupController();

router.post('/signup', async (req, res) => {
    let status = 'Success Response', statusCode = CODE_OK, message = '';

   // const signupInputDto: SignupInputDto = new SignupInputDto(req.body);
    const data = await signupController.signup(req.body);
    if (data.err) {
        statusCode = data.err.code;
        message = data.err.message;
        status = 'Failure'
    }
    const resp = await ResponseService(status, statusCode, message, data.err ? null : data);
    return res.status(statusCode).send(resp);
});

export const firebaseRoutes = router;
