import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from '../../features/user/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSignal = signal<User | null>(null);

  readonly isLoggedIn = computed(() => !!this.userSignal());

  constructor(private http: HttpClient, private router: Router) { }

  get user() {
    return this.userSignal.asReadonly();
  }

  register(username: string, email: string, password: string, rePass: string) {
    const body = { username, email, password, rePass };

    return this.http.post<User>('/register', body).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<User>('/login', body).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  setUser(user: User) {
    this.userSignal.set(user);
  }

  logout() {
    return this.http.post('/logout', {}).subscribe(() => {
      this.userSignal.set(null);
      this.router.navigate(['/login']);
    });
  }
}
