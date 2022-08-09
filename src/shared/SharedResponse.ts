import {Getters} from "./lombokJs/Getters";
import {Setters} from "./lombokJs/Setters";

@Getters()
@Setters()
export class SharedResponse<T> {
    status: string = '';
    code: number = 200;
    message: any = null;
    data: T = null;

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (!this.hasOwnProperty(p)) return;
            if (value[p]) this[p] = value[p];
        })
    }
}