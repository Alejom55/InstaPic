import { Component, Input, SimpleChanges } from '@angular/core';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../utils/users.service';
import { FriendRequest } from '../../interface/follows';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RandomProfileComponent } from './random-profile/random-profile.component';

@Component({
  selector: 'section-friends-request',
  standalone: true,
  imports: [FriendProfileComponent, LoadingComponent, CommonModule, RandomProfileComponent],
  templateUrl: './friends-request.component.html',
  styleUrl: './friends-request.component.css'
})
export class FriendsRequestComponent {
  loggedInUserNickname: string = "";
  @Input() userData: any;
  loading: boolean = true;
  pendingFollowers: Array<FriendRequest> = [];
  randomUsers: Array<any> = [];
  update = false;
  constructor(private user: UsersService) {
  }

  getUpdate(event: boolean) {
    this.getPendingFollowers(this.userData);
    if (this.pendingFollowers.length === 0) {
      this.getRandomUsers(this.userData);
    }

  }

  ngOnChanges(event: boolean) {
    this.pendingFollowers = [];
    this.getUpdate(event)
    if (this.userData) {
      this.getPendingFollowers(this.userData);
    }
  }

  getPendingFollowers(userData: any) {
    this.user.getPendingFollowers(userData.nickname).then(requests => {
      this.pendingFollowers = requests;
      this.loggedInUserNickname = userData.nickname;
      this.loading = false;
    });
  }

  getRandomUsers(userData: any) {
    this.user.findRandomUsersNotFollowed(userData.nickname).then(users => {
      this.randomUsers = users;
    });

  }



}
