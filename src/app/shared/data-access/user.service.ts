import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  checkUsernameAvailable(username: string) {
    // Randomly pass/fail
    const random = Math.random();

    return random < 0.5
      ? of(true).pipe(delay(1000))
      : of(false).pipe(delay(1000));
  }
}
