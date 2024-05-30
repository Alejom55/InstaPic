import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import axios from 'axios';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = environment.apiUrl

  constructor() { }

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
      const response = await axios.post(`${this.apiURL}/follower/check-follow`, { loggedInUserNickname: loggedInUser, targetUserNickname:targetUser })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
