import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ]
})
export class CategoryComponent implements OnInit {

  categories = input.required<string[]>();
  selectedCategory = input<string | null>('');
  select = output<string>();

  selectedCategoryControl = new FormControl('');

  onCategorySelected(value: string): void {
    this.select.emit(value);
  }

  constructor() {
    effect(() => {
      console.log('selected category', this.selectedCategory());

    })
  }
  ngOnInit(): void {
    this.selectedCategoryControl.setValue(this.selectedCategory());
  }
}
