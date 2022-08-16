import {ResponseService} from "../errors/ErrorService";
import {CODE_INTERNAL_SERVER_ERROR, CODE_UNAUTHORIZED} from "../enums/Errors";
import {getAuth} from "firebase-admin/auth";

export function isOwner(req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer) {
        const resp = ResponseService('Failure Request', CODE_UNAUTHORIZED, 'Unauthorized request', null);
        return res.status(CODE_UNAUTHORIZED).send(resp);
    }
    const token = bearer.includes('bearer') ?  bearer.split(' ')[1] : bearer;
    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            if(uid !== req.params.uid) {
                const resp = ResponseService('Failure Request', CODE_UNAUTHORIZED, 'Unauthorized request', null);
                return res.status(CODE_UNAUTHORIZED).send(resp);
            }
            next();
        })
        .catch((error) => {
            const resp = ResponseService('Failure Request', CODE_INTERNAL_SERVER_ERROR, error, null);
            return res.status(CODE_INTERNAL_SERVER_ERROR).send(resp);
        });
}