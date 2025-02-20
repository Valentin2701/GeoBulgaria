import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailErrorComponent } from "../../components/email-error/email-error.component";
import { PasswordErrorComponent } from "../../components/password-error/password-error.component";
import { UserService } from '../../services/user.service';
import { emailValidator } from '../../../../core/validators/email-validator';
import { passwordMatchValidator } from '../../../../core/validators/password-match-validator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [EmailErrorComponent, PasswordErrorComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator()]],
      passGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        rePass: ['', [Validators.required]],
      }, {
        validators: [passwordMatchValidator("password", "rePass")],
      })
    });
  }

  register(): void {
    if (this.form.valid) {
      const { username, email, passGroup } = this.form.value;
      this.userService.register(username, email, passGroup.password, passGroup.rePass);
    } else {
      console.error('Form is invalid');
    }
  }
}

