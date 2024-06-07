import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(public auth: AuthService) { }
  logIn() {
    this.auth.loginWithPopup().subscribe(() => {
      // this.isLoggedInRecently = true;
    });
  }
}
