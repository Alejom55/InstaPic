import { Component } from '@angular/core';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../utils/users.service';
import { AuthUserService } from '../../../utils/auth.service';
import { FriendRequest } from '../../interface/follows';

@Component({
  selector: 'section-friends-request',
  standalone: true,
  imports: [FriendProfileComponent],
  templateUrl: './friends-request.component.html',
  styleUrl: './friends-request.component.css'
})
export class FriendsRequestComponent {
  friends = [{
    id: 1,
    username: 'go/jo',
    avatar: 'assets/images/profile photo/Gojo.jpeg'
  },
  {
    id: 2,
    username: 'miluskaOMG777',
    avatar: 'assets/images/profile photo/miluska.jpeg'
  },
  {
    id: 3,
    username: 'Brandy',
    avatar: 'assets/images/profile photo/perro.jpeg'
  },
  {
    id: 4,
    username: 'taylorswift',
    avatar: 'assets/images/profile photo/kanye.jpeg'
  },
  {
    id: 5,
    username: 'l__2501',
    avatar: 'assets/images/profile photo/lasso.jpeg'

  },
  {
    id: 6,
    username: 'RonnyGod',
    avatar: 'assets/images/profile photo/ronny.jpg'
  },

  ]


  loggedInUserNickname: string = "";
  userData: any;
  loading: boolean = true;
  pendingFollowers: Array<FriendRequest> = [];

  constructor(private user: UsersService, private authUserService: AuthUserService) { }



  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      if (userData) {
        this.user.getPendingFollowers(userData.nickname).then(requests => {
          // console.log(requests)
          this.pendingFollowers = requests;
          this.loggedInUserNickname = userData.nickname;
        });
      }
    });
  }
}
