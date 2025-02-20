import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authService = Inject(AuthService);
  constructor() { }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe((user: User) => {
      this.authService.setUser(user);
    });
  }

  register(username: string, email: string, password: string, rePass: string) {
    this.authService.register(username, email, password, rePass).subscribe((user: User) => {
      this.authService.setUser(user);
    });
  }
}
