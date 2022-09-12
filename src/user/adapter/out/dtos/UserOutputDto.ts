import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class UserOutputDto extends DefaultClass {
    public _id: string = '';
    public uid: string = '';
    public createdAt: Date = null;
    public updatedAt: Date = null;
    public availableInvitations: number = 0;
    public consumedInvitations: number = 0;
    public canInvite: boolean = false;

    constructor(value?: any) {
        super();
        this.setProps(value);
    }

}