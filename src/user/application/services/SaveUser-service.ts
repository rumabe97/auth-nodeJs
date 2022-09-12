import {SaveUserPort} from "../port/SaveUserPort";
import {User} from "../../domain/User";
import {UserModel} from "../../adapter/persistence/UserModel";
import {clean} from "../../../shared/objectUtils/Clean";
import {CODE_INTERNAL_SERVER_ERROR} from "../../../shared/enums/Errors";

export class SaveUserService implements SaveUserPort {
    saveUser(user: User) {
        const saveUser = new UserModel(clean(user));
        return saveUser.save()
            .then(r => {
                return r;
            }).catch((error) => {
                return {err: {statusCode: CODE_INTERNAL_SERVER_ERROR, message: error}}
            });
    }
}