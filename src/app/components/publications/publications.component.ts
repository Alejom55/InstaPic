import { Component } from '@angular/core';
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
      username: 'username',
      image: 'https://via.placeholder.com/150',
      likes: 10,
      description: 'description',
      comments: []
    },
    {
      id: 2,
      username: 'username',
      image: 'https://via.placeholder.com/150',
      likes: 10,
      description: 'description',
      comments: []
    },
    {
      id: 3,
      username: 'username',
      image: 'https://via.placeholder.com/150',
      likes: 10,
      description: 'description',
      comments: []
    },
    {
      id: 4,
      username: 'username',
      image: 'https://via.placeholder.com/150',
      likes: 10,
      description: 'description',
      comments: []
    },
    {
      id: 5,
      username: 'username',
      image: 'https://via.placeholder.com/150',
      likes: 10,
      description: 'description',
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
    // this.obtener_localstorage();
  }

  get() {
    let posts = JSON.parse(localStorage.getItem('posts') || '{}');
    return posts;
  }

  clear_localstorage() {
    localStorage.clear();
  }
}
