import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../products.service';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../product';
import { AsyncPipe } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { AddProduct } from '../../basket/add-product';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    standalone: true,
    imports: [
        MatButtonModule,
        AsyncPipe,
        RouterLink,
        RouterLinkActive
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

    private _route = inject(ActivatedRoute);
    private _productsService = inject(ProductsService);
    private _basketService = inject(BasketService);

    product$: Observable<Product> | null = null;

    ngOnInit(): void {
        const productId = this._route.snapshot.paramMap.get('id');
        const isNumber = !Number.isNaN(productId);
        if (productId && isNumber) {
            this.product$ = this._productsService.getProductById(Number.parseInt(productId));
        }
    }

    addToBasket(product: Product): void {
        const addProduct = <AddProduct>{
            id: product.id,
            title: product.title,
            price: product.price
        };

        this._basketService.addToBasket(addProduct);
    }
}
