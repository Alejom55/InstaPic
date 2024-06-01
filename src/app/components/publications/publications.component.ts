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
      image: 'https://media.discordapp.net/attachments/1017156587795787820/1232391706062618675/435502601_970571071742646_5230263591836170917_n.png?ex=6635cff7&is=66347e77&hm=269195b2e9e74fb329bc46cc641ce66250fcdd1e5bbc9040686a188aed7cf456&=&format=webp&quality=lossless',
      likes: 520,
      description: 'Me pasó :(',
      comments: []
    },
    {
      id: 4,
      username: 'Daniel Lasso',
      image: 'https://media.discordapp.net/attachments/1017156587795787820/1217703368936394792/FB_IMG_1710393257446.jpg?ex=6635c522&is=663473a2&hm=24eb106a564b4abcefdf4959d28b389e24b594e82b8b3dc6253d64af554188e4&=&format=webp&width=651&height=671',
      likes: 10,
      description: 'Real',
      comments: []
    },
    {
      id: 5,
      username: 'Diego Murillo',
      image: 'https://media.discordapp.net/attachments/1017156587795787820/1227718448940060672/Imagen_de_WhatsApp_2024-04-10_a_las_09.29.37_ddb6dc81.jpg?ex=6635f328&is=6634a1a8&hm=a1558dc3b68c6e4647a7de574b08598f326c40c7ca0f94511bd01084c37a463c&=&format=webp&width=800&height=671',
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
