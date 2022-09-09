
export class User {
    public _id: string;
    private uid: string = '';
    public createDate: Date = null;
    public updateDate: Date = null;
    public availableInvitations: number = 0;
    public consumedInvitations: number = 0;
    public canInvite: boolean = false;

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (!this.hasOwnProperty(p)) return;
            if (value[p]) this[p] = value[p];
        })
    }
}