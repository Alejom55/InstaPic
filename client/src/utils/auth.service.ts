import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import axios from 'axios';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();
  private apiURL = environment.apiUrl

  constructor(public auth: AuthService) {
    this.auth.idTokenClaims$.subscribe(user => {
      if (user) {
        this.auth.isAuthenticated$.subscribe(async isLogged => {
          if (isLogged) {
            const userData = {
              nickname: user.nickname,
              picture: user.picture,
              email: user.email,
              name: user.name,
              token: user.__raw
            };
            this.userDataSubject.next(userData);
          } else {
            this.userDataSubject.next(null);
          }
        });
      } else {
        this.userDataSubject.next(null);
      }
    });
  }

  getUserData() {
    return this.userDataSubject.value;
  }

  public async createUser(userData: any): Promise<any> {
    const config = {
      headers: {
        'Authorization': `Bearer ${userData.token}`
      }
    };
    try {
      await axios.post(`${this.apiURL}/auth`, userData, config)
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
        });
    } catch (e) {
      console.log(e)
    }
  }

  logOut(user: AuthService): void {
    user.logout();
  }


}


