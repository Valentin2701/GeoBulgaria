import { ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(passControl: string, rePassControl: string): ValidatorFn{
    return (control) => {
        const pass = control.get(passControl);
        const rePass = control.get(rePassControl);
        return pass?.value == rePass?.value ? null : {passwordMatchValidator: true};
    }
}