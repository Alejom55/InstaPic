import { Component, Input } from '@angular/core';
import { FriendRequest } from '../../../interface/follows';
import { UsersService } from '../../../../utils/users.service';

@Component({
  selector: 'friend-profile',
  standalone: true,
  imports: [],
  template: `
  <div class="section-user-info">
  <div class="section-profile-pic">
    <img src="{{ targetUserPicture }}" alt="foto de perfil" />
  </div>
  <div class="section-profile-info">
    <span class="span-section-profile-username">{{ targetUserNickname }}</span>
  </div>
  <div class="section-user-buttons">
    <span class="span-friend-accept"(click)="acceptFollowRequest()">Aceptar</span>
    <span class="span-firend-ignore"(click)="rejectFollowRequest()">Ignorar</span>
  </div>
</div>
`,
  styleUrl: './friend-profile.component.css'
})
export class FriendProfileComponent {
  @Input() targetUserNickname = ''
  @Input() targetUserPicture = ''
  @Input() loggedInUserNickname = ''

  constructor(private user: UsersService) { }
  acceptFollowRequest() {
    this.user.acceptFollowRequest(this.loggedInUserNickname, this.targetUserNickname)
  }
  rejectFollowRequest() {
    this.user.rejectFollowRequest(this.loggedInUserNickname, this.targetUserNickname)
  }

}
