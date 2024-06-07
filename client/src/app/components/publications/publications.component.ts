import { Component, Input, SimpleChanges } from '@angular/core';
import { PublicationComponent } from './publication/publication.component';
import { PostsService } from '../../../utils/posts.service';
type Post = {
  id: number;
  username: string;
  userPicture: string;
  UrlImage: string;
  post_date: string;
  description: string;
};


@Component({
  selector: 'main-publications',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  posts:Array<Post> = []
  @Input() userData: any;

  constructor(private postsService: PostsService) {

  }

  ngOnInit(): void {
    if (this.userData) {

      console.log(this.userData)
    }
    // this.postsService.getFollowingUserPosts(this.userData.nickname).then(posts => {
    //   console.log(posts)
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && this.userData) {
      console.log(this.userData);
      this.loadPosts();
    }
  }

  // private async loadPosts(): Promise<void> {
  //   try {
  //     const posts = await this.postsService.getFollowingUserPosts(this.userData.nickname);
  //     console.log(posts);
  //     this.posts = posts;
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // }
  private async loadPosts(): Promise<void> {
    try {
      const rawPosts = await this.postsService.getFollowingUserPosts(this.userData.nickname);
      this.posts = rawPosts.map((rawPost: any) => this.mapToPost(rawPost));
      console.log(this.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  private mapToPost(rawPost: any): Post {
    return {
      id: rawPost.id,
      username: rawPost.user.nickname,
      userPicture: rawPost.user.picture,
      UrlImage: rawPost.uri_resource,
      post_date: rawPost.post_date,
      description: rawPost.description,
    };
  }


}
// post() {
//   let posts = [{
//     id: 1,
//     username: 'Juan Pablo Aguirre',
//     image: 'https://media.discordapp.net/attachments/1017156587795787820/1234942113976680562/image.png?ex=6635dcb8&is=66348b38&hm=32ef9864272d72ea4e9c5220dc93e1426ba0d6be918a82f7f0263608cd92204b&=&format=webp&quality=lossless',
//     likes: 100,
//     description: 'No nos gusta flutter',
//     comments: []
//   },
//   {
//     id: 2,
//     username: 'Alejandro Marín',
//     image: 'https://cdn.discordapp.com/attachments/1017156587795787820/1233561787916357683/image.png?ex=66361d30&is=6634cbb0&hm=6abfb7790ac8829e974f2621298f187829e1e4e778b97059b7d83e2d60eb36c2&',
//     likes: 10,
//     description: 'Así son',
//     comments: []
//   },
//   {
//     id: 3,
//     username: 'Santiago Arango',
//     image: 'https://media.discordapp.net/attachments/1017156587795787820/1232391706062618675/435502601_970571071742646_5230263591836170917_n.png?ex=6635cff7&is=66347e77&hm=269195b2e9e74fb329bc46cc641ce66250fcdd1e5bbc9040686a188aed7cf456&=&format=webp&quality=lossless',
//     likes: 520,
//     description: 'Me pasó :(',
//     comments: []
//   },
//   {
//     id: 4,
//     username: 'Daniel Lasso',
//     image: 'https://media.discordapp.net/attachments/1017156587795787820/1217703368936394792/FB_IMG_1710393257446.jpg?ex=6635c522&is=663473a2&hm=24eb106a564b4abcefdf4959d28b389e24b594e82b8b3dc6253d64af554188e4&=&format=webp&width=651&height=671',
//     likes: 10,
//     description: 'Real',
//     comments: []
//   },
//   {
//     id: 5,
//     username: 'Diego Murillo',
//     image: 'https://media.discordapp.net/attachments/1017156587795787820/1227718448940060672/Imagen_de_WhatsApp_2024-04-10_a_las_09.29.37_ddb6dc81.jpg?ex=6635f328&is=6634a1a8&hm=a1558dc3b68c6e4647a7de574b08598f326c40c7ca0f94511bd01084c37a463c&=&format=webp&width=800&height=671',
//     likes: 15550,
//     description: 'Principio básico',
//     comments: []
//   }
//   ]
//   localStorage.setItem('posts', JSON.stringify(posts));
// }