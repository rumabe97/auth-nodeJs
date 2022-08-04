import {capitalize} from "../stringUtils/Capitalize";

const Setters = () => <T extends { new(...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            const props = Reflect.ownKeys(this);
            props.forEach((prop: string) => {
                const capitalizedKey = capitalize(prop);
                const methodName = `set${capitalizedKey}`;
                Object.defineProperty(this, methodName, {
                    value: (newValue: any) => {
                        this[prop] = newValue
                    }
                });
            });
        }
    }
}