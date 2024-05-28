import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import axios from 'axios';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  // private readonly _http = inject(HttpClient)

  private apiURL = environment.apiUrl
  constructor() { }

  public async createUser(userData: any): Promise<any> {
    const config = {
      headers: {
        'Authorization': `Bearer ${userData.token}`
      }
    };
    try {
      await axios.post(`${this.apiURL}/auth`, userData, config)
        .then(response => {
          console.log(response);
        })
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


