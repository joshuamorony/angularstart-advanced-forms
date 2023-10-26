import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const adultValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value >= 18 ? null : { adultValidator: true };
};
