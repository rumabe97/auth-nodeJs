import {User} from "../../domain/User";

export interface UpdateUserPort {
    updateUser(user: User);
}