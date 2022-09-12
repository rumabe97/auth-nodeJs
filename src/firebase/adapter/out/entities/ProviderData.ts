import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class ProviderData extends DefaultClass {
    private uid: string = '';
    private providerIn: string = '';
    private phoneNumber: string = '';
    private displayName: string = '';
    private photoURL: string = '';

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}