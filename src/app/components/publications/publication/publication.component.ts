import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Comentario {
  id: number;
  username: string;
  comment: string;
  date: Date;
}



@Component({
  selector: 'publication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @Input() username = ''
  @Input() description = ''
  @Input() image = ''
  @Input() comments: Comentario[] = []
  @Input() likes = 0
  @Input() id = 0
  newComment = '';

  submitComment() {
    this.addComment(this.id, this.newComment, this.getUsername());
    this.newComment = '';
  }

  getUsername() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username;
  }

  getComments() {
    let posts = JSON.parse(localStorage.getItem('posts') || '{}');
    let post = posts.find((post: { id: number; }) => post.id === this.id);
    return post.comments;

  }

  post(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error storing data:', e);
    }
  }

  addComment(postId: number, newComment: string, username: string = 'Your Username') {
    const posts = JSON.parse(localStorage.getItem('posts') || '{}');
    const matchingPost = posts.find((post: { id: number; }) => post.id === postId);
    if (matchingPost) {
      const commented = this.comments || [];
      const newId = commented.length ? Math.max(...commented.map(c => c.id)) + 1 : 1;
      matchingPost.comments.push({
        id: newId,
        username: username,
        comment: newComment,
        fecha: new Date()
      });
      localStorage.setItem('posts', JSON.stringify(posts));
      console.log('Comment added successfully!');
    } else {
      console.error('Post with ID', postId, 'not found');
    }
  }


}
