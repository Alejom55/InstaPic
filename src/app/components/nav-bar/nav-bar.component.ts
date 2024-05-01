import { Component, Input } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() isLogged = false;
}
