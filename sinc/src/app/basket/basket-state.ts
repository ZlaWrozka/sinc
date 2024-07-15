import { BasketItem } from "./basket-item";

export interface BasketState {
    userId: number | null;
    selectedProducts: BasketItem[];
    totalPrice: number;
    error: string | null;
}
