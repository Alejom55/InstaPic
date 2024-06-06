import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = '';
  constructor(private router: Router) { }

  onSubmit(event: Event) {
    event.preventDefault();
    const username = this.searchQuery;
    this.router.navigate([username]);
    this.searchQuery = '';
  }
}
