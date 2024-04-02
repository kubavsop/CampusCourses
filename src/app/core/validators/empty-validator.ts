import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const EmptyValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (value === null || value === '' || value.trim() === '') {
    return { isEmpty: true };
  }
  return null;
};
