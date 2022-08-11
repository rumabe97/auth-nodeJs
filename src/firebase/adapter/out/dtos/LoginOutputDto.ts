import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";
import {AllArgsConstruct} from "../../../../shared/lombokJs/AllArgsConstruc";
import {ProviderData} from "../entities/ProviderData";
import {TokenManager} from "../entities/TokenManager";

@Getters()
@Setters()
@AllArgsConstruct()
export class LoginOutputDto {
    private uid: string = '';
    private displayName: string = '';
    private photoURL: string = '';
    private email: string = '';
    private phoneNumber: string = '';
    private emailVerified: boolean = false;
    private isAnonymous: boolean = false;
    private providerData: ProviderData = null;
    private createdAt: Date = new Date();
    private lastLoginAt:Date = new Date();
    private stsTokenManager: TokenManager = null;

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (!this.hasOwnProperty(p)) return;
            if (value[p]) this[p] = value[p];
        })
    }
}