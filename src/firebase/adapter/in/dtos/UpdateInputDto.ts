import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class UpdateInputDto extends DefaultClass {
    private email: string = '';
    private phoneNumber: string = '';
    private displayName: string = '';
    private photoURL: string = '';

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}