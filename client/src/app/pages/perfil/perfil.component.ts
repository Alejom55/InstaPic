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
  loading: boolean = true;
  follow: boolean| string = false ;
  constructor(private route: ActivatedRoute, private user: UsersService, private authUserService: AuthUserService) { }



  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      this.route.paramMap.subscribe(params => {
        this.userNickname = params.get('id');
        if (userData) {
          this.user.checkIfUserFollows(userData.nickname, this.userNickname).then(followData => {
            console.log(followData)
            if (this.userNickname) {
              if (followData === 'Accepted') {
                this.user.findUserByNicknamePrivate(this.userNickname).then(findData => {
                  this.username = findData.nickname;
                  this.followers = findData.followers;
                  this.following = findData.following;
                  this.picture = findData.picture;
                  this.posts = findData.posts;
                  this.follow = followData;
                  console.log(this.follow)
                  this.loading = false;
                });
              } else {
                this.user.findUserByNickname(this.userNickname).then(findData => {
                  this.username = findData.nickname;
                  this.followers = findData.followers;
                  this.following = findData.following;
                  this.picture = findData.picture;
                  this.follow = followData;
                  this.loading = false;
                });
              }
            }
          });

        }
      });
    });

  }
  followUser() {
    this.user.followUser(this.userData.nickname, this.userNickname);
    // this.follow = true;
  }



}
