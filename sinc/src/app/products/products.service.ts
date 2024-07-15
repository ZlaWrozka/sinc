import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { setErrorMessage } from '../utils/error-utils';
import { Product } from './product';
import { ProductsHttpService } from './products-http.service';
import { ProductsState } from './products-state';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _productsHttpService = inject(ProductsHttpService);

  // state
  private _state = signal(<ProductsState>{
    products: [],
    error: null,
    loaded: false,
    currentPage: 1,
    selectedCategory: null,
    categories: []
  });

  filterControl = new FormControl();

  // selectors
  products$$ = computed(() => this._state().products);
  error$$ = computed(() => this._state().error);
  isLoaded$$ = computed(() => this._state().loaded);
  currentPage$$ = computed(() => this._state().currentPage);
  selectedCategory$$ = computed(() => this._state().selectedCategory);
  categories$$ = computed(() => {
    const products = this.products$$();

    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories;
  });

  filteredProducts$$ = computed(() => {
    const selectedCategory = this.selectedCategory$$();
    const productsAll = this.products$$();
    return productsAll.filter((product) => selectedCategory ? product.category === selectedCategory: product);
  });

  filteredProductsForPage$$ = computed(() => {
    const productsAll = this.filteredProducts$$();
    const currentPage = this.currentPage$$();

    const pageSize = 5;
    const startInclusive = (currentPage - 1) * pageSize;
    const endExclusive = currentPage * pageSize;

    return productsAll.slice(startInclusive, endExclusive);
  });

  // sources
  private _currentPage$ = new Subject<number>();
  private _selectCategory$ = new Subject<string>();

  products$ = this._productsHttpService.getAll();

  constructor() {

    this.products$.pipe(takeUntilDestroyed())
      .subscribe({
        next: (products) =>
          this._state.update((state) => <ProductsState>{
            ...state,
            products: products,
            loaded: true
          }),
        error: (err) =>
          this._state.update((state) => <ProductsState>{
            ...state,
            error: setErrorMessage(err)
          })
      });

    this._currentPage$.pipe(takeUntilDestroyed()).subscribe(
      {
        next: (currentPage) =>
          this._state.update((state) => <ProductsState>{
            ...state,
            currentPage
          })
      }
    );

    this._selectCategory$.pipe(takeUntilDestroyed()).subscribe(
      {
        next: (selectedCategory) =>
          this._state.update((state) => <ProductsState>{
            ...state,
            selectedCategory
          })
      }
    );

  }

  updatePage(page: number): void {
    this._currentPage$.next(page);
  }

  getProductById(id: number): Observable<Product> {
    return this._productsHttpService.getProductById(id);
  }

  selectCategory(category: string): void {
    this._selectCategory$.next(category);
  }
}
