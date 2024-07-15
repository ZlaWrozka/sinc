import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent {

  private _basketService = inject(BasketService);

  selectedProducts$$ = this._basketService.selectedProducts$$;
  totalPrice$$ = this._basketService.updatedTotalPrice$$;

  constructor() {
    effect(() => {
      console.log('signal selectedProducts', this.selectedProducts$$());
      
    });
  }

}
