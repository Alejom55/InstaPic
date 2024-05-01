import { Component } from '@angular/core';
import { PublicationComponent } from './publication/publication.component';

@Component({
  selector: 'main-publications',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  posts = [{
    id: 1,
    username: 'username',
    image: 'https://via.placeholder.com/150',
    likes: 10,
    comments: [{
      id: null,
      username: '',
      comment: ''
    }]
  },
  {
    id: 2,
    username: 'username',
    image: 'https://via.placeholder.com/150',
    likes: 10,
    comments: [{
      id: null,
      username: '',
      comment: ''
    }]
  },
  {
    id: 3,
    username: 'username',
    image: 'https://via.placeholder.com/150',
    likes: 10,
    comments: [{
      id: null,
      username: '',
      comment: ''
    }]
  },
  {
    id: 4,
    username: 'username',
    image: 'https://via.placeholder.com/150',
    likes: 10,
    comments: [{
      id: null,
      username: '',
      comment: ''
    }]
  },
  {
    id: 5,
    username: 'username',
    image: 'https://via.placeholder.com/150',
    likes: 10,
    comments: [{
      id: null,
      username: '',
      comment: ''
    }]
  }

  ]
}
