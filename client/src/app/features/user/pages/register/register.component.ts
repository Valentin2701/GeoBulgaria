import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailErrorComponent } from "../../components/email-error/email-error.component";
import { PasswordErrorComponent } from "../../components/password-error/password-error.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [EmailErrorComponent, PasswordErrorComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      passGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        rePass: ['', [Validators.required]],
      }, {
        validators: [],
      })
    });
  }

  register(): void {
    this.userService.register(this.form.value.username, this.form.value.email, this.form.value.passGroup.password, this.form.value.passGroup.rePass);
  }
}

