import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../../utils/auth.service';
import { Subject, combineLatest, filter } from 'rxjs';

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

  userData: any;

  constructor(private authUserService: AuthUserService, public auth: AuthService) { }

  ngOnInit(): void {
    combineLatest([
      this.auth.isAuthenticated$,
      this.authUserService.userData$
    ]).pipe(
      filter(([isAuthenticated, userData]) => isAuthenticated && !!userData)
    ).subscribe(([isAuthenticated, userData]) => {
      if (userData) {
        this.userData = userData;
        this.username = userData.nickname;
        this.picture = userData.picture;
        this.email = userData.email;
        this.name = userData.name;

        if (this.isLoggedInRecently) {
          this.authUserService.createUser(userData);
          this.isLoggedInRecently = false; 
        }

      }
    });
  }
  logIn() {
    this.auth.loginWithPopup().subscribe(() => {
      this.isLoggedInRecently = true;
    });
  }

  // constructor(public auth: AuthService, private authUserService: AuthUserService) {
  //   this.auth.idTokenClaims$.subscribe(user => {
  //     if (user) {
  //       this.auth.isAuthenticated$.subscribe(async isLogged => {
  //         this.isLogged = isLogged;
  //         if (isLogged && this.isLoggedInRecently) {
  //           const userData = {
  //             nickname: user.nickname,
  //             picture: user.picture,
  //             email: user.email,
  //             name: user.name,
  //             token: user.__raw
  //           };
  //           this.userDataSubject.next(userData); 
  //           this.isLoggedInRecently = false; 
  //         }
  //       });
  //       this.username = user.nickname || '';
  //       this.picture = user.picture || '';

  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.userDataSubject.subscribe(userData => {
  //     this.authUserService.createUser(userData);
  //   });
  // }


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

  logOut() {
    this.authUserService.logOut(this.auth);
    this.delete();
  };

}