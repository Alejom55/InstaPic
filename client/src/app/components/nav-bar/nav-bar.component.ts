import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { logIn, logOut } from '../../../utils/auth-utils';

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
  constructor(public auth: AuthService) {
    auth.user$.subscribe(user => {
      console.log(user)
      this.username = user?.nickname || ''
      this.avatar = user?.picture || ''
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
    logIn(this.auth);
    this.post();
    this.isLogged = true;
  };
  logOut() {
    logOut(this.auth);
    this.delete();
    this.isLogged = false;
  };

}