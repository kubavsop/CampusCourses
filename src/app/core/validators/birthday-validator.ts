import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const BirthdayValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value == null) return null;
  let value = new Date(control.value);
  return value < new Date("01/01/1900") || value > new Date() ? {WrongRange: true} : null;
};
