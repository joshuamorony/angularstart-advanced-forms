import { Injector } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from '../data-access/user.service';

export const usernameAvailableValidator: ValidatorFn = (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  const injector = Injector.create([
    { provide: UserService, useClass: UserService },
  ]);
  return injector
    .get(UserService)
    .checkUsernameAvailable(control.value)
    .pipe(
      map((isAvailable) => (isAvailable ? null : { usernameAvailable: true })),
      catchError(() => of(null))
    );
};
