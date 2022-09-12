import {CODE_INTERNAL_SERVER_ERROR, CODE_UNAUTHORIZED} from "../enums/Errors";
import {ErrResponseService} from "../errors/ErrorService";
import {getAuth} from "firebase-admin/auth";

export function authenticate(req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer) {
        const resp = ErrResponseService({
            status: 'Failure Request',
            statsCode: CODE_UNAUTHORIZED,
            message: 'Unauthorized request'
        });
        return res.status(CODE_UNAUTHORIZED).send(resp);
    }
    const token = bearer.includes('bearer') ? bearer.split(' ')[1] : bearer;
    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            //TODO: Add necesary logic
            next();
        })
        .catch((error) => {
            const resp = ErrResponseService({
                status: 'Failure Request',
                statusCode: CODE_INTERNAL_SERVER_ERROR,
                message: error
            });
            return res.status(CODE_INTERNAL_SERVER_ERROR).send(resp);
        });
}