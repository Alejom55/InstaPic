import { Component, Input } from '@angular/core';

@Component({
  selector: 'friend-profile',
  standalone: true,
  imports: [],
  template: `
  <div class="section-user-info">
  <div class="section-profile-pic">
    <img src="{{ avatar }}" alt="foto de perfil" />
  </div>
  <div class="section-profile-info">
    <span class="span-section-profile-username">{{ username }}</span>
  </div>
  <div class="section-user-buttons">
    <span class="span-friend-accept">Aceptar</span>
    <span class="span-firend-ignore">Ignorar</span>
  </div>
</div>
`,
  styleUrl: './friend-profile.component.css'
})
export class FriendProfileComponent {
  @Input() username = ''
  @Input() avatar = ''
}
