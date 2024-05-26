import { AuthService } from '@auth0/auth0-angular';

export function logIn(auth: AuthService): void {
  auth.loginWithPopup();
}

export function logOut(auth: AuthService): void {
  auth.logout();
}
