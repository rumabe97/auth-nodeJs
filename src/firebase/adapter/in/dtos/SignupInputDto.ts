import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class SignupInputDto extends DefaultClass {
    private email: string = '';
    private password: string = '';
    private emailVerified: boolean = false;
    private phoneNumber: string = '';
    private displayName: string = '';
    private photoURL: string = '';
    private disbled: boolean = false;

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}