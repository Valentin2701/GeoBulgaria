import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailErrorComponent } from "../../components/email-error/email-error.component";
import { PasswordErrorComponent } from "../../components/password-error/password-error.component";

@Component({
  selector: 'app-register',
  imports: [EmailErrorComponent, PasswordErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      passGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        rePass: ['', [Validators.required]]
      }, {
        validators: []
      })
    });
  }

  register() {
    
  }
}
