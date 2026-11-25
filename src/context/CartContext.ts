import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Product } from "../data/products";

export type CartLine = { product: Product; quantity: number };

export type CartContextValue = {
  addToCart: (product: Product) => void;
  cart: CartLine[];
  setCart: Dispatch<SetStateAction<CartLine[]>>;
  openCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within the cart provider.");
  return context;
}
