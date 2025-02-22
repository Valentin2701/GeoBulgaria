import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const routingGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.fetchUserSession().pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/register']);
        return false;
      }
    })
  );
};
