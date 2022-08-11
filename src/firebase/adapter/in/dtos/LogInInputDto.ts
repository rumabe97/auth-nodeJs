import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";

@Getters()
@Setters()
export class LogInInputDto {
    private email: string = '';
    private password: string = '';

    constructor(value?: any) {
        const props = Reflect.ownKeys(this);
        if (!value) return;
        props.forEach(p => {
            if (!this.hasOwnProperty(p)) return;
            if (value[p]) this[p] = value[p];
        })
    }
}