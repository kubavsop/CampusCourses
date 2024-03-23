import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const numberValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
    const isValid = !isNaN(control.value);
    return isValid ? null : {number: true};
}
