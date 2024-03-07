import { AbstractControl } from "@angular/forms";

export function validateTypeDate(control: AbstractControl) {
    const value = control.value;
    if (value == null || value == '' || value <= '1850-01-01' || value > (new Date().toISOString().split('T')[0])) {
      return { required: true };
    } else {
      return null;
    }
}