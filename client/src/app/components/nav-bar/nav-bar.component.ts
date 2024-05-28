import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../../utils/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [UserProfileComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private userDataSubject = new Subject<any>();
  private isLoggedInRecently = false;
  @Input() isLogged = false;
  username = ""
  picture = ""
  email = ""
  name = ""

  constructor(public auth: AuthService, private authUserService: AuthUserService) {
    this.auth.idTokenClaims$.subscribe(user => {
      if (user) {
        this.auth.isAuthenticated$.subscribe(async isLogged => {
          this.isLogged = isLogged;
          if (isLogged && this.isLoggedInRecently) {
            const userData = {
              nickname: user.nickname,
              picture: user.picture,
              email: user.email,
              name: user.name,
              token: user.__raw
            };
            this.userDataSubject.next(userData); 
            this.isLoggedInRecently = false; 
          }
        });
        this.username = user.nickname || '';
        this.picture = user.picture || '';

      }
    });
  }

  ngOnInit(): void {
    this.userDataSubject.subscribe(userData => {
      this.authUserService.createUser(userData);
    });
  }


  get() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  post() {
    let user = {
      username: 'José Julián Zapata Arbeláez',
      friends: 50,
      picture: 'assets/images/profile photo/603a8623163a5.jpeg'
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  delete() {
    localStorage.removeItem('user');
  }
  logIn() {
    this.auth.loginWithPopup().subscribe(() => {
      this.isLoggedInRecently = true;
    });
  }
  logOut() {
    this.authUserService.logOut(this.auth);
    this.delete();
  };

}