import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-password-error',
  imports: [],
  templateUrl: './password-error.component.html',
  styleUrl: './password-error.component.css'
})
export class PasswordErrorComponent {
  @Input() password: AbstractControl | undefined | null;
}
