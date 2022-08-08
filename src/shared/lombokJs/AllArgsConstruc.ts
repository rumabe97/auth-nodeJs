import {capitalize} from "../stringUtils/Capitalize";

export const AllArgsConstruct = () => <T extends { new(...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            const props = Reflect.ownKeys(this);
            if (!args) return;
            props.forEach(p => {
                if (this.hasOwnProperty(p)) return;
                if (args[p]) this[`set${capitalize(p as string)}`](args[p])
            })
        }
    }
}