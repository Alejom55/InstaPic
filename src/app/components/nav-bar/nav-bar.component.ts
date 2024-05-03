import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() isLogged = false;

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
    this.post();
    this.isLogged = true;
  };
  logOut() {
    this.delete();
    this.isLogged = false;
  };

}