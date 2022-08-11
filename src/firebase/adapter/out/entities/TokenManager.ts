import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";
import {AllArgsConstruct} from "../../../../shared/lombokJs/AllArgsConstruc";

@Getters()
@Setters()
@AllArgsConstruct()
export class TokenManager {
    private refreshToken: string = '';
    private accessToken: string = '';
    private expirationTime: Date = new Date();

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (!this.hasOwnProperty(p)) return;
            if (value[p]) this[p] = value[p];
        })
    }
}