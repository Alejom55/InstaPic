import { Component, Input } from '@angular/core';
import { PublicationComponent } from './publication/publication.component';
type Post = {
  id: number;
  username: string;
  image: string;
  likes: number;
  comments: { id: number | null, username: string, comment: string }[];
};


@Component({
  selector: 'main-publications',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  post() {
    let posts = [{
      id: 1,
      username: 'Juan Pablo Aguirre',
      image: 'https://miro.medium.com/v2/resize:fit:750/1*3T7J7csXY8u36acofw5N8g.jpeg',
      likes: 100,
      description: 'No nos gusta flutter',
      comments: []
    },
    {
      id: 2,
      username: 'Alejandro Marín',
      image: 'https://websiteminds.weebly.com/uploads/1/4/2/3/142328969/blog-post-on-web-dev_orig.jpg',
      likes: 10,
      description: 'Así son',
      comments: []
    },
    {
      id: 3,
      username: 'Santiago Arango',
      image: 'https://www.bundlen.com/wp-content/uploads/2023/03/637ef1f502c0f83324cbf1ad_ABM-College-Web-developer-main.jpg',
      likes: 520,
      description: 'Me pasó :(',
      comments: []
    },
    {
      id: 4,
      username: 'Daniel Lasso',
      image: 'https://www.optimalvirtualemployee.com/wp-content/uploads/2022/12/Web-Developer-skill.jpg',
      likes: 10,
      description: 'Real',
      comments: []
    },
    {
      id: 5,
      username: 'Diego Murillo',
      image: 'https://th.bing.com/th/id/R.6f4405e1a4d82dd86bce65f61e4a2606?rik=E9CXe%2bqla0xx%2bQ&pid=ImgRaw&r=0&PC=EMMX01&darkschemeovr=1',
      likes: 15550,
      description: 'Principio básico',
      comments: []
    }
    ]
    localStorage.setItem('posts', JSON.stringify(posts));
  }


  constructor() {
    if (!localStorage.getItem('posts')) {
      this.post();
    }
    // this.clear_localstorage();
  }

  get() {
    let posts = JSON.parse(localStorage.getItem('posts') || '{}');
    return posts;
  }

  clear_localstorage() {
    localStorage.clear();
  }
}
