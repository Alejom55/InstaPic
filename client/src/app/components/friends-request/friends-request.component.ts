import { Component } from '@angular/core';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';

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
}
