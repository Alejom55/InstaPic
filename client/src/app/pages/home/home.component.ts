import { Component } from '@angular/core';
import { FriendsRequestComponent } from '../../components/friends-request/friends-request.component';
import { PublicationsComponent } from '../../components/publications/publications.component';
import { PublicationComponent } from '../../components/publications/publication/publication.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { GlobalStateService } from '../../../utils/global-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, FriendsRequestComponent, PublicationsComponent, PublicationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLogged = false;
  message: string = '';


  getLogged(logged: boolean) {
    this.isLogged = logged;
  }
  constructor(private globalStateService: GlobalStateService) {
    if (localStorage.getItem('user')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

}
