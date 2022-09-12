import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class Metadata extends DefaultClass {
    private lastSignInTime: Date = null;
    private creationTime: Date = null;
    private lastRefreshTime: Date = null;

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}