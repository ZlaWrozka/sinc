import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private _isLoading$$ = signal(false);

  // API
  isLoading$$ = this._isLoading$$.asReadonly();

  loadingOn(){
    this._isLoading$$.set(true);
  }

  loadingOff() {
    this._isLoading$$.set(false);
  }
}
