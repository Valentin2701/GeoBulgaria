import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../models/User';
import { APIAuthResponse } from '../models/APIAuthResponse';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) { }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe((response: APIAuthResponse | null) => {
      if(response?.user) return throwError(() => response?.message);
      this.authService.setUser(response?.user ? response.user : null);
      this.snackbarService.showSuccess('Влязохте успешно');
      this.router.navigate(['/map']);
      return response;
    });
  }

  register(username: string, email: string, password: string, rePass: string) {
    this.authService.register(username, email, password, rePass).subscribe((response: APIAuthResponse | null) => {
      if(response?.user == null) return throwError(() => response?.message);
      this.authService.setUser(response?.user ? response.user : null);
      this.snackbarService.showSuccess('Регистрирахте се успешно');
      this.router.navigate(['/map']);
      return response;
    });
  }
}
