import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailErrorComponent } from "../../components/email-error/email-error.component";
import { PasswordErrorComponent } from "../../components/password-error/password-error.component";
import { UserService } from '../../services/user.service';
import { emailValidator } from '../../../../core/validators/email-validator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [EmailErrorComponent, PasswordErrorComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.userService.login(email, password);
    } else {
      console.error('Form is invalid');
    }
  }
}
