import { Component } from '@angular/core';
import { FriendsRequestComponent } from '../../components/friends-request/friends-request.component';
import { PublicationsComponent } from '../../components/publications/publications.component';
import { PublicationComponent } from '../../components/publications/publication/publication.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { UsersService } from '../../../utils/users.service';
import { AuthUserService } from '../../../utils/auth.service';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, FriendsRequestComponent, PublicationsComponent, PublicationComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userData: any;
  logged = false;

  constructor(private user: UsersService, private authUserService: AuthUserService) { }


  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      this.logged = true;
    });
  }

}
