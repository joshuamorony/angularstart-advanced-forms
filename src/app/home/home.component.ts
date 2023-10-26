import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { adultValidator } from '../shared/utils/adult-validator';
import { usernameAvailableValidator } from '../shared/utils/username-available-validator';
import { passwordMatchesValidator } from '../shared/utils/password-matches';
import { HappinessLevelComponent } from '../shared/ui/happiness-level.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="handleSubmit()" #form="ngForm">
      <div>
        <input formControlName="username" type="text" />
        <span>{{ usernameStatus() }}</span>
        @if( !myForm.controls.username.valid && (myForm.controls.username.dirty
        || form.submitted) ){
        <p>Please provide a username that is not taken</p>
        }
      </div>
      <div>
        <input formControlName="age" type="number" />
        @if( !myForm.controls.age.valid && (myForm.controls.age.dirty ||
        form.submitted) ){

        <p>Age must be greater than 18</p>
        }
      </div>
      <div>
        <input formControlName="password" type="password" />
        @if( !myForm.controls.password.valid && (myForm.controls.password.dirty
        || form.submitted) ){
        <p>Password must be at least 8 characters long</p>
        }
      </div>
      <div>
        <input formControlName="confirmPassword" type="password" />
        @if( myForm.hasError('passwordMatch') &&
        (myForm.controls.confirmPassword.dirty || form.submitted) ){

        <p>Must match password</p>
        }
      </div>
      <div>
        <h2>Add Guests</h2>
        <ng-container formArrayName="guests">
          @for(guest of myForm.controls.guests.controls; let i = $index; track
          i){
          <input [formControlName]="i" type="text" />
          }
        </ng-container>
        <button (click)="addGuest()">Add</button>
      </div>

      <app-happiness-level formControlName="happiness"></app-happiness-level>

      @if(!myForm.valid){
      <p>There are errors with the form!</p>
      }
      <button type="submit" [disabled]="myForm.pending">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule, HappinessLevelComponent],
})
export default class HomeComponent {
  private fb = inject(FormBuilder);

  myForm = this.fb.nonNullable.group(
    {
      username: ['', Validators.required, usernameAvailableValidator],
      age: [null, adultValidator],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
      guests: this.fb.array([]),
      happiness: ['neutral', Validators.required],
    },
    {
      validators: [passwordMatchesValidator],
    }
  );

  usernameStatus = toSignal(this.myForm.controls.username.statusChanges);

  handleSubmit() {
    console.log(this.myForm.value);
  }

  addGuest() {
    const guestControl = this.fb.control('', Validators.required);
    this.myForm.controls.guests.push(guestControl);
  }
}
