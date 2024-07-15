import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'products', loadComponent: () => import('./products/products/products.component').then(c => c.ProductsComponent) },
    { path: 'product/:id', loadComponent: () => import('./products/product/product.component').then(c => c.ProductComponent) },
    { path: 'login', loadComponent: () => import('./login/login/login.component').then(c => c.LoginComponent) },
    { path: 'logout', loadComponent: () => import('./login/login/login.component').then(c => c.LoginComponent) },
    { path: '**', redirectTo: 'products' }
];
