import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { User } from '../../features/user/models/User';
import { APIAuthResponse } from '../../features/user/models/APIAuthResponse';
import { SnackbarService } from './snackbar.service';
import { LoaderService } from './loader.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSignal = signal<User | null>(null);

  readonly isLoggedIn = computed(() => !!this.userSignal());
  private sessionChecked = false;

  constructor(private http: HttpClient, private router: Router, private snackbarService: SnackbarService, private loaderService: LoaderService, private dialog: MatDialog) { }

  get user() {
    return this.userSignal.asReadonly();
  }

  fetchUserSession() {
    if (this.sessionChecked) {
      return of(this.userSignal());
    }

    this.loaderService.showLoader();
    return this.http.get<User | null>('/api/profile').pipe(
      tap((user) => {
        this.setUser(user);
        this.sessionChecked = true;
        this.loaderService.hideLoader();
      }),
      catchError(() => {
        this.setUser(null);
        this.sessionChecked = true;
        this.loaderService.hideLoader();
        return of(null);
      })
    );
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { message: 'Сигурни ли сте че искате да излезете от профила си?' }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
         this.http.post('/api/logout', {}).subscribe(() => {
          this.userSignal.set(null);
          this.snackbarService.showSuccess('Излязохте успешно');
          this.router.navigate(['/']);
        });
      }
    })
  }
}
