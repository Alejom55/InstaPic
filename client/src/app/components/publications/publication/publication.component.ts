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
  @Input() userPicture = ''
  @Input() post_date = ''
  isLogged = false;
  newComment = '';

}
