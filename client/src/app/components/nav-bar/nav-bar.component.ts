import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../../utils/auth.service';
import { Subject, combineLatest, filter } from 'rxjs';
import { UsersService } from '../../../utils/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [UserProfileComponent, CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private isLoggedInRecently = false;
  @Input() isLogged = false;
  username = ""
  picture = ""
  email = ""
  name = ""
  followers: any[] = [];

  userData: any;
  constructor(private authUserService: AuthUserService, public auth: AuthService, private user: UsersService,private router: Router) { }

  ngOnInit(): void {
    combineLatest([
      this.auth.isAuthenticated$,
      this.authUserService.userData$
    ]).pipe(
      filter(([isAuthenticated, userData]) => isAuthenticated && !!userData)
    ).subscribe(([isAuthenticated, userData]) => {
      if (userData) {
        this.user.findUserByNickname(userData.nickname).then(findData => {
          this.username = findData.nickname;
          this.followers = findData.followers;
          this.picture = findData.picture;
          this.email = findData.email;
          this.name = findData.name;
          this.countAcceptedFollowers();
        });

        this.userData = userData;


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

  acceptedFollowersCount: number = 0;
  countAcceptedFollowers(): void {
    this.acceptedFollowersCount = this.user.countAcceptedFollowers(this.followers);
  }

  
  hola() {
    const ruta = window.prompt("Ingrese el usuario:");
    this.router.navigate([ruta]);
  }

}