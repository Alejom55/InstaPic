import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="container">
    <div class="nav-user-info">

      <div class="nav-profile-pic" routerLink="/{{userData.nickname}}">
          <img
            src={{userData.picture}}
            alt="foto de perfil"
          />
        </div>
      <div class="nav-profile-info">
      <a routerLink="/{{userData.nickname}}" class="span-nav-profile-username">
          {{userData.nickname}}
      </a>
        <span class="span-nav-profile-friends">Seguidores: {{followers}}</span>
      </div>
    </div>
</div>`,
  styles: `
  .container{
    width: 20vw;
    min-width: 200px;
    max-width: 330px;
  }
  .nav-profile-pic {
    width: 44px;
    height: 44px;
    overflow: hidden;
    border-radius: 50%;
}
.nav-profile-pic:hover{
  cursor: pointer;

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
.span-nav-profile-username{
  text-decoration: none;
  color: inherit;
}

`
})
export class UserProfileComponent {
  @Input() username = '';
  @Input() picture = '';
  @Input() followers: number = 0;
  @Input() userData: any;
  constructor() {
  }

}
