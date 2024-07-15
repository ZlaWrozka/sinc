import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { setErrorMessage } from '../utils/error-utils';
import { AddProduct } from './add-product';
import { BasketItem } from './basket-item';
import { BasketState } from './basket-state';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  // state
  private _state = signal(<BasketState>{
    selectedProducts: [],
    totalPrice: 0,
    error: null,
    userId: null
  });

  // selectors
  selectedProducts$$ = computed(() => this._state().selectedProducts);
  error$$ = computed(() => this._state().error);
  userId$$ = computed(() => this._state().userId);
  updatedTotalPrice$$ = computed(() => {
    const basketItems = this.selectedProducts$$();
    const totalPrice =  basketItems.reduce((acc, item) => acc + item.count * item.price, 0);
    return totalPrice;
  });

  // sources
  private _add$ = new Subject<AddProduct>();

  constructor() {
    this._add$.pipe(takeUntilDestroyed()
    ).subscribe(
      {
        next: (product) => {
          // Create a new basket item
          const basketItem = <BasketItem>{
            id: product.id,
            title: product.title,
            count: 1,
            price: product.price
          };

          // Update if already exists
          let existingBasketItem = this.selectedProducts$$().find((prod) => prod.id === product.id);
          if (existingBasketItem) {
            basketItem.count = existingBasketItem.count + 1;
          }

          return this._state.update((state) => <BasketState>{
            ...state,
            selectedProducts: [...state.selectedProducts.filter(item => item.id !== product.id), basketItem]
          })
        }
        ,
        error: (err) =>
          this._state.update((state) => <BasketState>{
            ...state,
            error: setErrorMessage(err)
          })
      }
    );
  }

  addToBasket(product: AddProduct): void {
    this._add$.next(product);
  }


}
