import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../utils/users.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="container">
    <div class="nav-user-info">
      <a routerLink="/perfil">
      <div class="nav-profile-pic">
          <img
            src={{picture}}
            alt="foto de perfil"
          />
        </div>
      </a>
      <div class="nav-profile-info">
      <a routerLink="/perfil" class="span-nav-profile-username">
          {{username}}
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
  @Input() friends = 0;
  @Input() picture = '';
  @Input() followers:number = 0;



}
