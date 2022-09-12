import {Metadata} from "../entities/Metadata";
import {ProviderData} from "../entities/ProviderData";
import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class SignupOutputDto extends DefaultClass {
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

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}