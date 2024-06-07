import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../../../../utils/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'friend-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="section-user-info">
  <div class="section-profile-pic" routerLink="/{{targetUserNickname}}">
    <img src="{{ targetUserPicture }}" alt="foto de perfil" />
  </div>
  <div class="section-profile-info" routerLink="/{{targetUserNickname}}">
    <span class="span-section-profile-username">{{ targetUserNickname }}</span>
  </div>
  <div class="section-user-buttons">
    <span class="span-friend-accept"(click)="acceptFollowRequest()">Aceptar</span>
    <span class="span-friend-ignore"(click)="rejectFollowRequest()">Ignorar</span>
  </div>
</div>
`,
  styleUrl: './friend-profile.component.css'
})
export class FriendProfileComponent {
  @Input() targetUserNickname = ''
  @Input() targetUserPicture = ''
  @Input() loggedInUserNickname = ''
  @Output() clicked = new EventEmitter<boolean>()

  constructor(private user: UsersService) { }
  acceptFollowRequest() {
    this.user.acceptFollowRequest(this.loggedInUserNickname, this.targetUserNickname)
    this.clicked.emit(true)
  }
  rejectFollowRequest() {
    this.user.rejectFollowRequest(this.loggedInUserNickname, this.targetUserNickname)
    this.clicked.emit(true)
  }

}
