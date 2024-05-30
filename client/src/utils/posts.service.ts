import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';
import { AuthUserService } from './auth.service';
import { UploadImage } from '../app/interface/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiURL = environment.apiUrl
  private userData: any;
  constructor(private authUserService: AuthUserService) {

    authUserService.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }

  public async createPost(createPost: UploadImage): Promise<any> {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.userData.token}`
      }
    };
    try {
      const response = await axios.post(`${this.apiURL}/post/upload`, createPost, config)
      return response.data
    } catch (e) {
      console.log(e)
    }

  }
}
