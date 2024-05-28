import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../../utils/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [UserProfileComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() isLogged = false;
  username = ""
  avatar = ""
  email = ""
  name = ""
  constructor(public auth: AuthService, private authUserService: AuthUserService) {
    auth.idTokenClaims$.subscribe(claims => console.log(claims))
    // console.log(auth.isAuthenticated$)
    auth.user$.subscribe(user => {
      console.log(user)
      this.username = user?.nickname || ''
      this.avatar = user?.picture || ''
      this.email = user?.email || ''
      this.name = user?.name || ''
      console.log(user?.sub)
    })
    auth.isAuthenticated$.subscribe(isLogged => {
      this.isLogged = isLogged;
      if (isLogged) {
        // this.authUserService.createUser(this.auth)
        console.log(this.username)
        console.log('avatar', this.avatar)
        console.log('email', this.email)
        console.log('name', this.name)
      }
      console.log(isLogged)
    })
  }


  get() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  post() {
    let user = {
      username: 'José Julián Zapata Arbeláez',
      friends: 50,
      avatar: 'assets/images/profile photo/603a8623163a5.jpeg'
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  delete() {
    localStorage.removeItem('user');
  }

  logIn() {
    this.auth.loginWithPopup();
    // this.authUserService.createUser(this.auth)
    // this.authUserService.getData()
    // this.post();
  };
  logOut() {
    this.authUserService.logOut(this.auth);
    this.delete();
  };

}