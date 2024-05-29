import { Component } from '@angular/core';
import { FriendsRequestComponent } from '../../components/friends-request/friends-request.component';
import { PublicationsComponent } from '../../components/publications/publications.component';
import { PublicationComponent } from '../../components/publications/publication/publication.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, FriendsRequestComponent, PublicationsComponent, PublicationComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class perfilComponent {
  isLogged = false;
  message: string = '';


  getLogged(logged: boolean) {
    this.isLogged = logged;
  }
  constructor() {
    if (localStorage.getItem('user')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

}
