import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import axios from 'axios';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AuthUserService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = environment.apiUrl
  private userData: any;
  constructor(private authUserService: AuthUserService) {

    authUserService.userData$.subscribe(userData => {
      this.userData = userData;
      // console.log(userData)
    });
  }



  public async findUserByNickname(nickname: string): Promise<any | null> {
    try {
      const response = await axios.get(`${this.apiURL}/auth/${nickname}`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  public async checkIfUserFollows(loggedInUser: any, targetUser: any): Promise<void> {
    try {
      // console.log(this.userData)
      const response = await axios.post(`${this.apiURL}/follower/check-follow`, { loggedInUserNickname: loggedInUser, targetUserNickname: targetUser })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
