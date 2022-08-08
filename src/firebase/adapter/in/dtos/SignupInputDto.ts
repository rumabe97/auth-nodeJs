import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";
import {capitalize} from "../../../../shared/stringUtils/Capitalize";

@Getters()
@Setters()
export class SignupInputDto {
    private email: string = '';
    private password: string = '';
    private emailVerified: boolean = false;
    private phoneNumber: string = '';
    private displayName: string = '';
    private photoURL: string = '';
    private disbled: boolean = false;

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (this.hasOwnProperty(p)) return;
            if (value[p]) this[`set${capitalize(p as string)}`](value[p])
        })
    }
}