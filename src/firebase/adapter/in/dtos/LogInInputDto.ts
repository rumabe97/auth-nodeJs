import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class LogInInputDto extends DefaultClass {
    public email: string = '';
    private password: string = '';

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}