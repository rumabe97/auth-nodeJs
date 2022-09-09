import {CreateUserPort} from "../port/CreateUser-port";
import {User} from "../../domain/User";
import {UserModel} from "../../adapter/persistence/UserModel";
import {clean} from "../../../shared/objectUtils/Clean";
import {CODE_BAD_REQUEST} from "../../../shared/enums/Errors";

export class CreateUserService implements CreateUserPort {
    createUser(user: User) {
        const saveUser = new UserModel(clean(user));
        return saveUser.save()
            .then(r => {
                return r;
            }).catch((error) => {
                return {err: {code: CODE_BAD_REQUEST, message: error}}
            });
    }
}