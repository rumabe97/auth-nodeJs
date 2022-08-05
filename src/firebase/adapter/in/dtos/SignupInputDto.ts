import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";

@Getters()
@Setters()
export class SignupInputDto {
    email: string;
    password: string;

    constructor() {
        this.email = '';
        this.password = '';
    }
}