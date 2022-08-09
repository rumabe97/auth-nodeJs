import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";
import {AllArgsConstruct} from "../../../../shared/lombokJs/AllArgsConstruc";

@Getters()
@Setters()
@AllArgsConstruct()
export class ProviderData {
    private uid: string = '';
    private providerIn: string = '';
    private phoneNumber: string = '';
    private displayName: string = '';
    private photoURL: string = '';
}