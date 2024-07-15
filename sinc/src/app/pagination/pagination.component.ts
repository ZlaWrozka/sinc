import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  currentPage$$ = input.required<number>({ alias: 'currentPage'});
  loadPage = output<number>();

  loadPreviousPage(){
    if (this.currentPage$$() > 1) {
      this.loadPage.emit(this.currentPage$$() - 1);
    }
  }

  loadNextPage(){
    this.loadPage.emit(this.currentPage$$() + 1);
  }
}
