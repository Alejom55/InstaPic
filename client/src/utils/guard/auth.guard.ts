import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs';

export const authGuardLogged: CanActivateFn = (route, state) => {
  let userAuth = inject(AuthService);
  let router = inject(Router);
  return userAuth.isAuthenticated$.pipe(tap(isLogged => {
    if (!isLogged) {
      router.navigate(['']);
    }
  }));
};

export const authGuardNotLogged: CanActivateFn = (route, state) => {
  let userAuth = inject(AuthService);
  let router = inject(Router);
  return userAuth.isAuthenticated$.pipe(tap(isLogged => {
    if (isLogged) {
      router.navigate(['']);
    }
  }));
};


