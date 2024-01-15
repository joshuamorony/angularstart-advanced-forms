import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Mood = 'sad' | 'happy' | 'neutral';

@Component({
  standalone: true,
  selector: 'app-happiness-level',
  template: `
    <div>
      <button (click)="setMood('sad')" [class.active]="mood === 'sad'">
        Sad
      </button>
      <button (click)="setMood('neutral')" [class.active]="mood === 'neutral'">
        Neutral
      </button>
      <button (click)="setMood('happy')" [class.active]="mood === 'happy'">
        Happy
      </button>
    </div>
  `,
  styles: [
    `
      .active {
        font-weight: bold;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HappinessLevelComponent,
      multi: true,
    },
  ],
})
export class HappinessLevelComponent implements ControlValueAccessor {
  mood = 'neutral';

  onChange = (value: Mood) => { };
  onTouch = () => { };

  setMood(mood: Mood) {
    this.mood = mood;
    this.onChange(mood);
    this.onTouch();
  }

  writeValue(value: Mood) {
    this.mood = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
