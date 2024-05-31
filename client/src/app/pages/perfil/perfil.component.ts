import { Component } from '@angular/core';
import { FriendsRequestComponent } from '../../components/friends-request/friends-request.component';
import { PublicationsComponent } from '../../components/publications/publications.component';
import { PublicationComponent } from '../../components/publications/publication/publication.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../utils/users.service';
import { AuthUserService } from '../../../utils/auth.service';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, FriendsRequestComponent, PublicationsComponent, PublicationComponent, NotFoundComponent, LoadingComponent],
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
  follow: boolean | string = false;
  Me: boolean = false;
  notFound: boolean = false;
  constructor(private route: ActivatedRoute, private user: UsersService, private authUserService: AuthUserService) { }



  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      this.route.paramMap.subscribe(params => {
        this.userNickname = params.get('id');
        if (this.userNickname === userData.nickname) {
          this.Me = true;
        }
        if (userData && this.Me === false) {
          if (this.userNickname) {
            this.checkIfUserFollows(userData, this.userNickname)
          }

        } else {
          if (this.userNickname) {
            this.findUserByNicknamePrivate(this.userNickname);
          }

        }
      });
    });
  }
  checkIfUserFollows(userData: any, userNickname: string) {
    this.user.checkIfUserFollows(userData.nickname, userNickname)
      .then(followData => {
        this.follow = followData;
      })
      .catch(error => {
        this.notFound = true;
        console.log('Error en checkIfUserFollows:', error);
      });
    if (this.userNickname) {
      if (this.follow === 'Accepted') {
        this.findUserByNicknamePrivate(this.userNickname, this.follow);

      } else {
        this.findUserByNickname(this.userNickname, this.follow);
      }
    }
  }
  updateFollowers() { }

  findUserByNickname(userNickname: string, followData: boolean | string = false) {
    this.user.findUserByNickname(userNickname)
      .then(findData => {
        this.username = findData.nickname;
        this.followers = findData.followers;
        this.following = findData.following;
        this.picture = findData.picture;
        this.follow = followData;
        this.loading = false;
        this.countAcceptedFollowers();
        this.countAcceptedFollowing();
        this.notFound = false;
      })
      .catch(error => {
        console.log('Error en findUserByNickname:', error);
        this.notFound = true;
        this.loading = false;
      });
  }


  findUserByNicknamePrivate(userNickname: string, followData: boolean | string = false) {
    this.user.findUserByNicknamePrivate(userNickname)
      .then(findData => {
        this.username = findData.nickname;
        this.followers = findData.followers;
        this.following = findData.following;
        this.picture = findData.picture;
        this.posts = findData.posts;
        this.follow = followData;
        this.loading = false;
        this.countAcceptedFollowers();
        this.countAcceptedFollowing();
        this.notFound = false;
      })
      .catch(error => {
        console.log('Error en findUserByNicknamePrivate:', error);
      });
  }


  followUser() {
    this.user.followUser(this.userData.nickname, this.userNickname)
      .then(() => {
        if (this.userNickname) {
          this.checkIfUserFollows(this.userData, this.userNickname);
        }
      })
      .catch(error => {
        console.log('Error en followUser:', error);
      });
  }

  acceptedFollowersCount: number = 0;
  countAcceptedFollowers(): void {
    this.acceptedFollowersCount = this.user.countAcceptedFollowers(this.followers);
  }
  acceptedFollowingCount: number = 0;
  countAcceptedFollowing(): void {
    this.acceptedFollowingCount = this.user.countAcceptedFollowing(this.following);
  }



}
