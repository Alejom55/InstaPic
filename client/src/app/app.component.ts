import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FriendsRequestComponent } from './components/friends-request/friends-request.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationComponent } from './components/publications/publication/publication.component';
import { GlobalStateService } from '../utils/global-state.service';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../utils/state/word.reducer';
// import { counterReducer } from '';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  providers: [GlobalStateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstaPic';

}
