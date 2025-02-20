import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-email-error',
  imports: [],
  templateUrl: './email-error.component.html',
  styleUrl: './email-error.component.css'
})
export class EmailErrorComponent {
  @Input() email: AbstractControl | undefined | null;
}
