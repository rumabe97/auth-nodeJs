import {DefaultClass} from "../../shared/objectUtils/DefaultClass";

export class User extends DefaultClass{
    public _id: string;
    private uid: string = '';
    public createDate: Date = null;
    public updateDate: Date = null;
    public availableInvitations: number = 0;
    public consumedInvitations: number = 0;
    public canInvite: boolean = false;

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}