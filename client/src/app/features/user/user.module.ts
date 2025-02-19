import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EmailErrorComponent } from './components/email-error/email-error.component';
import { PasswordErrorComponent } from './components/password-error/password-error.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EmailErrorComponent,
    PasswordErrorComponent,
    ReactiveFormsModule
  ],
})
export class UserModule { }
