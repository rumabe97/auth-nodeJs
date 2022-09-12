import {DefaultClass} from "../../../../shared/objectUtils/DefaultClass";

export class TokenManager extends DefaultClass {
    private refreshToken: string = '';
    private accessToken: string = '';
    private expirationTime: Date = new Date();

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}