import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addItemToCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
  },
});

export default cartSlice.reducer;
export const { toggleCart, closeCart, addItemToCart } = cartSlice.actions;
