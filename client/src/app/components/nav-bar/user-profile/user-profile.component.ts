import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  template: `
  <div class="container">
    <div class="nav-user-info">
      <div class="nav-profile-pic">
        <img
          src={{avatar}}
          alt="foto de perfil"
        />
      </div>
      <div class="nav-profile-info">
        <span class="span-nav-profile-username">{{username}}</span>
        <span class="span-nav-profile-friends">Amigos: {{friends}}</span>
      </div>
    </div>
</div>`,
  styles: `
  .container{
    width: 20vw;
    min-width: 300px;
    max-width: 330px;
  }
  .nav-profile-pic {
    width: 44px;
    height: 44px;
    overflow: hidden;
    border-radius: 50%;
}

.nav-profile-pic img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.nav-profile-info {
    display: grid;
    margin-left: 10px;
}
.nav-user-info {
    display: flex;
    align-items: center;
}

.span-nav-profile-friends {
    color: #808080;

}

`
})
export class UserProfileComponent {
  @Input() username = '';
  @Input() friends = 0;
  @Input() avatar = '';
  // user = {
  //   username: 'José Julián Zapata Arbeláez',
  //   friends: 50,
  //   avatar: 'assets/images/profile photo/603a8623163a5.jpeg'
  // }
}
