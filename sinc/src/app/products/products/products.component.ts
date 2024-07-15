import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { AddProduct } from '../../basket/add-product';
import { BasketService } from '../../basket/basket.service';
import { CategoryComponent } from "../../category/category.component";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    standalone: true,
    imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    PaginationComponent,
    RouterLink,
    RouterLinkActive,
    CategoryComponent,
    CategoryComponent
],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

    private _productsService = inject(ProductsService);
    private _basketService = inject(BasketService);

    isLoaded$$ = this._productsService.isLoaded$$;
    error$$ = this._productsService.error$$;
    currentPage$$ = this._productsService.currentPage$$;
    productsForPage$$ = this._productsService.filteredProductsForPage$$;
    categories$$ = this._productsService.categories$$;
    selectedCategory$$ = this._productsService.selectedCategory$$;

    onLoadPage(page: number): void {
        this._productsService.updatePage(page);
    }

    onCategorySelected(value: string): void {
        this._productsService.selectCategory(value);
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
