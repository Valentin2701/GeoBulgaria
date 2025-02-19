import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailErrorComponent } from "../../components/email-error/email-error.component";
import { PasswordErrorComponent } from "../../components/password-error/password-error.component";

@Component({
  selector: 'app-register',
  imports: [EmailErrorComponent, PasswordErrorComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = Inject(FormBuilder);
  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePass: ['', [Validators.required]],
    }, {
      validators: [],
    })
  });

  register(): void {

  }
}

