import {CYAN_LOG, GREEN_LOG, RED_LOG, YELLOW_LOG} from "../enums/Errors";
import {clean} from "../objectUtils/Clean";
import {SharedResponse} from "../SharedResponse";

export function ResponseService(status, statusCode, message, data): SharedResponse<any> {
    return clean({status: status, code: statusCode, message: message, data: data});
}

export const LogSuccess = (msg) => {
    console.log(GREEN_LOG, msg);
}
export const LogInfo = (msg) => {
    console.log(CYAN_LOG, msg);
}
export const LogWarning = (msg) => {
    console.log(YELLOW_LOG, msg);
}
export const LogDanger = (msg) => {
    console.log(RED_LOG, msg);
}