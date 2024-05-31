import { Component, Input, SimpleChanges } from '@angular/core';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../utils/users.service';
import { AuthUserService } from '../../../utils/auth.service';
import { FriendRequest } from '../../interface/follows';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'section-friends-request',
  standalone: true,
  imports: [FriendProfileComponent, LoadingComponent, CommonModule],
  templateUrl: './friends-request.component.html',
  styleUrl: './friends-request.component.css'
})
export class FriendsRequestComponent {
  loggedInUserNickname: string = "";
  @Input() userData: any;
  loading: boolean = true;
  pendingFollowers: Array<FriendRequest> = [];
  update = false;
  constructor(private user: UsersService, private authUserService: AuthUserService) { 
  }

  getUpdate(event: boolean) {
    this.update = event;
    this.getPendingFollowers(this.userData);

  }

  ngOnChanges(event: boolean) {
    this.getUpdate(event)
    console.log(this.update)
  
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



}
