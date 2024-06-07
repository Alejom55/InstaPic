import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../../../../utils/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-random-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './random-profile.component.html',
  styleUrl: './random-profile.component.css'
})
export class RandomProfileComponent {
  @Input() targetUserNickname = ''
  @Input() targetUserPicture = ''
  @Input() loggedInUserNickname = ''
  @Output() clicked = new EventEmitter<boolean>()
  follow: boolean | string = false;
  constructor(private user: UsersService) { }

  followUser() {
    this.user.followUser(this.loggedInUserNickname, this.targetUserNickname)
      .then(() => {
        this.checkIfUserFollows(this.loggedInUserNickname, this.targetUserNickname);
      })
      .catch(error => {
        console.log('Error en followUser:', error);
      });
  }

  unFollowUser() {
      this.user.unFollowUser(this.loggedInUserNickname, this.targetUserNickname)
        .then(() => {
            this.checkIfUserFollows(this.loggedInUserNickname, this.targetUserNickname);
        })
        .catch(error => {
          console.log('Error en unFollowUser:', error);
        });
    
  }


  checkIfUserFollows(loggedInUserNickname: string, userNickname: string) {
    this.user.checkIfUserFollows(loggedInUserNickname, userNickname)
      .then(followData => {
        this.follow = followData;
        if (followData === 'Pending') {
          this.follow = 'Pending';
        }else{
          this.follow = false;
        }

      })
      .catch(error => {
        console.log('Error en checkIfUserFollows:', error);
      });

  }
}
