import { createSlice } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { itemsCount: 0, items: [] };
};

const saveCartToStorage = debounce((cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, 500);

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart(state, action) {
      const { id, weight, quantity = 1, price, name, image } = action.payload;
      if (!id || !weight || !price || !name) return;

      const existingItem = state.items.find(
        (item) => item.id === id && item.weight === weight
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        state.itemsCount += quantity;
      } else {
        state.items.push({ id, weight, quantity, price, name, image });
        state.itemsCount += quantity;
      }
    },
    removeFromCart(state, action) {
      const { id, weight } = action.payload;
      if (!id || !weight) return;

      const itemToRemove = state.items.find(
        (item) => item.id === id && item.weight === weight
      );
      if (!itemToRemove) return;

      state.itemsCount -= itemToRemove.quantity;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.weight === weight)
      );
    },
    updateQuantity(state, action) {
      const { id, weight, delta } = action.payload;
      if (!id || !weight || typeof delta !== 'number') return;

      const itemToUpdate = state.items.find(
        (item) => item.id === id && item.weight === weight
      );
      if (!itemToUpdate) return;

      const newQuantity = itemToUpdate.quantity + delta;

      if (newQuantity <= 0) {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.weight === weight)
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

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

const cartActionTypes = new Set([
  addToCart.type,
  removeFromCart.type,
  updateQuantity.type,
  clearCart.type,
]);

export default cartSlice.reducer;

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (cartActionTypes.has(action.type)) {
    saveCartToStorage(store.getState().cart);
  }
  return result;
};
