import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FriendsRequestComponent } from './components/friends-request/friends-request.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationComponent } from './components/publications/publication/publication.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FriendsRequestComponent, PublicationsComponent, PublicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstaPic';
}
