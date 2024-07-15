import { Product } from "./product";

export interface ProductsState {
    products: Product[];
    loaded: boolean;
    error: string | null;
    currentPage: number;
    selectedCategory: string | null;
    categories: string[];
}
