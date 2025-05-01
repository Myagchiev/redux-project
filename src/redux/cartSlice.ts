import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

interface CartItem {
  id: number;
  weight: number;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  itemsCount: number;
}

const loadCartFromStorage = (): CartState => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { items: [], itemsCount: 0 };
};

const saveCartToStorage = debounce((cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, 500);

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { id, weight, quantity = 1, price, name, image } = action.payload;
      if (!id || !weight || !price || !name) return;

      const existingItem = state.items.find(
        (item) => item.id === id && item.weight === weight,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        state.itemsCount += quantity;
      } else {
        state.items.push({ id, weight, quantity, price, name, image });
        state.itemsCount += quantity;
      }
    },
    removeFromCart(state, action: PayloadAction<{ id: number; weight: number }>) {
      const { id, weight } = action.payload;
      if (!id || !weight) return;

      const itemToRemove = state.items.find(
        (item) => item.id === id && item.weight === weight,
      );
      if (!itemToRemove) return;

      state.itemsCount -= itemToRemove.quantity;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.weight === weight),
      );
    },
    updateQuantity(state, action: PayloadAction<{ id: number; weight: number; delta: number }>) {
      const { id, weight, delta } = action.payload;
      if (!id || !weight || typeof delta !== 'number') return;

      const itemToUpdate = state.items.find(
        (item) => item.id === id && item.weight === weight,
      );
      if (!itemToUpdate) return;

      const newQuantity = itemToUpdate.quantity + delta;

      if (newQuantity <= 0) {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.weight === weight),
        );
        state.itemsCount -= itemToUpdate.quantity;
      } else {
        const quantityChange = newQuantity - itemToUpdate.quantity;
        itemToUpdate.quantity = newQuantity;
        state.itemsCount += quantityChange;
      }
    },
    clearCart(state) {
      state.items = [];
      state.itemsCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

const cartActionTypes = new Set<string>([
  addToCart.type,
  removeFromCart.type,
  updateQuantity.type,
  clearCart.type,
]);

export default cartSlice.reducer;

export const cartMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof action.type === 'string' &&
    cartActionTypes.has(action.type)
  ) {
    saveCartToStorage((store.getState() as { cart: CartState }).cart);
  }
  return result;
};