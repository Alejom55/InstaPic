import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthUserService } from '../utils/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstaPic';
  isLogged = false;
  userData: any;


  constructor(private authUserService: AuthUserService) {

  }

  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      if (userData !== null) {
        this.isLogged = true;
      }
    });
  }





}
