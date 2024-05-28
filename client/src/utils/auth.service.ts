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

  private readonly _http = inject(HttpClient)

  private apiURL = environment.apiUrl
  constructor() { }

  async getData(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiURL}`)
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.log(e)
    }
    // return this._http.get(this.apiURL).pipe(
    //   tap(data => console.log(data)),
    // );
  }


  public createUser(userData: AuthService): void {
    console.log(userData)
    userData.loginWithPopup();

    try {

      // userData.user$.subscribe(async user => {
      //   const formatedData2 = ({
      //     email: user?.email,
      //     name: user?.name,
      //     nickname: user?.nickname,
      //   })
      // })
      // return this._http.get(this.url);
      // const response = this._http.get(`${this.apiURL}/auth`)
      // console.log(response)
      // return response;
      // const response = await axios.post(`${this.apiURL}/auth`, hola)
      // return response.data;
      // const plainUserData = {
      //   email: userData.user$,
      //   name: userData.name,
      //   last_name: userData.last_name,
      //   nickname: userData.nickname,
      //   password: userData.password,
      //   birthdate: userData.birthdate
      // };
    } catch (e) {
      console.log(e)
    }
  }


  logOut(user: AuthService): void {
    user.logout();
  }

  // async createUser2(userData: any): Promise<void> {
  //   try {
  //     // No need to access password on client-side

  //     const response = await axios.post(`${this.apiURL}/auth`, userData);
  //     console.log('User registration successful:', response);

  //     // Alternatively, use Auth0 Management API to fetch user profile (optional)
  //     // const profile = await this.authService.getUser$().toPromise();
  //     // console.log('User profile:', profile);

  //     // Handle successful registration (e.g., navigate to profile page)
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     // Handle errors gracefully (e.g., display error message to user)
  //   }
  // }

}


