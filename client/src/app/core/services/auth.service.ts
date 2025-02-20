import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from '../../features/user/models/User';
import { APIAuthResponse } from '../../features/user/models/APIAuthResponse';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSignal = signal<User | null>(null);

  readonly isLoggedIn = computed(() => !!this.userSignal());

  constructor(private http: HttpClient, private router: Router, private snackbarService: SnackbarService) { }

  get user() {
    return this.userSignal.asReadonly();
  }

  register(username: string, email: string, password: string, rePass: string) {
    const body = { username, email, password, rePass };

    return this.http.post<APIAuthResponse>('/api/register', body).pipe(
      catchError((error) => {
        this.snackbarService.showError('Този имейл вече съществува! Опитайте да влезете в акаунта си');
        return of(null);
      })
    );
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<APIAuthResponse>('/api/login', body).pipe(
      catchError((error) => {
        this.snackbarService.showError('Невалиден имейл или парола! Опитайте отново');
        return of(null);
      })
    );
  }

  setUser(user: User | null) {
    this.userSignal.set(user);
  }

  logout() {
    return this.http.post('/api/logout', {}).subscribe(() => {
      this.userSignal.set(null);
      this.snackbarService.showSuccess('Излязохте успешно');
      this.router.navigate(['/login']);
    });
  }
}
