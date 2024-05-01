import { Component, Input } from '@angular/core';

@Component({
  selector: 'publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @Input() username = ''
  @Input() description = ''
  @Input() image = ''
  @Input() comments = [{
    id: null,
    username: '',
    comment: ''
  }]
  @Input() likes = 0
}
