import {User} from "../../domain/User";

export interface SaveUserPort {
    saveUser(user: User);
}