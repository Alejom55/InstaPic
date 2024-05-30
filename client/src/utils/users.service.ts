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

  public async findUserByNicknamePrivate(nickname: string): Promise<any | null> {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.userData.token}`
      }
    };
    try {
      const response = await axios.get(`${this.apiURL}/auth/${nickname}/private`, config)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  public async checkIfUserFollows(loggedInUser: any, targetUser: any): Promise<boolean | string> {
    try {
      const response = await axios.post(`${this.apiURL}/follower/check-follow`, { loggedInUserNickname: loggedInUser, targetUserNickname: targetUser })
      return response.data
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async followUser(loggedInUser: any, targetUser: any): Promise<void> {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.userData.token}`
      }
    };
    try {
      await axios.post(`${this.apiURL}/follower/follow-user`, { loggedInUserNickname: loggedInUser, targetUserNickname: targetUser }, config)
    } catch (e) {
      console.log(e)
    }
  }

  public countAcceptedFollowers(followersArray: Array<any>): number {
    return followersArray.filter(follower => follower.state === 'Accepted').length;
  }
  public countAcceptedFollowing(followingArray: Array<any>): number {
    return followingArray.filter(follower => follower.state === 'Accepted').length;
  }



}
