import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../models/User';
import { APIAuthResponse } from '../models/APIAuthResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService, private router: Router) { }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe((response: APIAuthResponse | null) => {
      this.authService.setUser(response?.user ? response.user : null);
      this.router.navigate(['/map']);
    });
  }

  register(username: string, email: string, password: string, rePass: string) {
    this.authService.register(username, email, password, rePass).subscribe((response: APIAuthResponse | null) => {
      this.authService.setUser(response?.user ? response.user : null);
      this.router.navigate(['/map']);
    });
  }
}
