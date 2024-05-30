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



  logOut() {
    this.authUserService.logOut(this.auth);
  };

}