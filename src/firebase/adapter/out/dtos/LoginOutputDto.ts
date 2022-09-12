import {ProviderData} from "../entities/ProviderData";
import {TokenManager} from "../entities/TokenManager";
import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class LoginOutputDto extends DefaultClass {
    private uid: string = '';
    private displayName: string = '';
    private photoURL: string = '';
    private email: string = '';
    private phoneNumber: string = '';
    private emailVerified: boolean = false;
    private isAnonymous: boolean = false;
    private providerData: ProviderData = null;
    private createdAt: Date = new Date();
    private lastLoginAt: Date = new Date();
    private stsTokenManager: TokenManager = null;

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}