import { ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn{
    const regExp = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`);
    return (control) => {
        if(control.value.length > 0 && regExp.test(control.value)) return null;
        return {emailValidator: true}
    }
}