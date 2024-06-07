import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';
import { AuthUserService } from './auth.service';
import { UploadImage } from '../app/interface/posts';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

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

  // public async getFollowingUserPosts(username: string): Promise<any> {
  //   const config = {
  //     headers: {
  //       'Authorization': `Bearer ${this.userData.token}`
  //     }
  //   };
  //   try {
  //     const response = await axios.get(`${this.apiURL}/post/following-users-posts/${username}`, config)
  //     return response.data
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  public async getFollowingUserPosts(username: string): Promise<any> {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.userData.token}`
      }
    };
    try {
      const response = await axios.get(`${this.apiURL}/post/following-users-posts/${username}`, config);
      const posts = response.data.map((post: { post_date: string | number | Date }) => ({
        ...post,
        // post_date: formatDistanceToNow(new Date(post.post_date), { addSuffix: true, locale: es })
      }));
      posts.sort((a: any, b: any) => {
        return new Date(b.post_date).getTime() - new Date(a.post_date).getTime();
      });

      return posts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
