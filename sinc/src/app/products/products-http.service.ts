import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {

  private static readonly BASE_PRODUCTS_URL = 'https://fakestoreapi.com/products';

  private _http = inject(HttpClient);

  constructor() { }

  public getAll(): Observable<Product[]> {
    return this._http.get<Product[]>(`${ProductsHttpService.BASE_PRODUCTS_URL}`);
  }

  public getProductById(id: number): Observable<Product> {
    return this._http.get<any>(`${ProductsHttpService.BASE_PRODUCTS_URL}/${id}`);
  }

}
