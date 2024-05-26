import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}


// import { Component } from '@angular/core';

// // Import the AuthService type from the SDK
// import { AuthService } from '@auth0/auth0-angular';

// @Component({
//   selector: 'app-login',
//   template: '<button (click)="auth.loginWithRedirect()">Log in</button>',
//   standalone: true
// })
// export class LoginComponent {
//   // Inject the authentication service into your component through the constructor
//   constructor(public auth: AuthService) {}
// }