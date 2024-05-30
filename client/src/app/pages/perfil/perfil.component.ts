import { Component } from '@angular/core';
import { FriendsRequestComponent } from '../../components/friends-request/friends-request.component';
import { PublicationsComponent } from '../../components/publications/publications.component';
import { PublicationComponent } from '../../components/publications/publication/publication.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../utils/users.service';
import { AuthUserService } from '../../../utils/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, FriendsRequestComponent, PublicationsComponent, PublicationComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class perfilComponent {
  userNickname: string | null = null;
  userData: any;
  username: string = "";
  posts: any[] = [];
  followers: any[] = [];
  following: any[] = [];
  picture: string = "";
  constructor(private route: ActivatedRoute, private user: UsersService, private authUserService: AuthUserService) { }



  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      this.route.paramMap.subscribe(params => {
        this.userNickname = params.get('id');
        if (this.userNickname) {
          this.user.checkIfUserFollows(userData.nickname, this.userNickname).then(data => {
            console.log(data);
          });
          
          this.user.findUserByNickname(this.userNickname).then(data => {
            this.username = data.nickname;
            this.followers = data.followers;
            this.following = data.following;
            this.picture = data.picture;
            console.log(data);
          });
        }
      });
    });

  }



}
