import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";
import {AllArgsConstruct} from "../../../../shared/lombokJs/AllArgsConstruc";
import {Metadata} from "../entities/Metadata";
import {ProviderData} from "../entities/ProviderData";
import {capitalize} from "../../../../shared/stringUtils/Capitalize";

@Getters()
@Setters()
@AllArgsConstruct()
export class SignupOutputDto {
    private uid: string = '';
    private email: string = '';
    private emailVerified: boolean = false;
    private phoneNumber: string = '';
    private displayName: string = '';
    private photoUrl: string = '';
    private disbled: boolean = false;
    private metadata: Metadata = new Metadata();
    private tokensValidAfterTime: Date = new Date();
    private providerData: ProviderData[] = [new ProviderData()];
    private test:Date = new Date();

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (this.hasOwnProperty(p)) return;
            if (value[p]) this[`set${capitalize(p as string)}`](value[p])
        })
    }
}