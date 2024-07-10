import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";

export const registerCart = createAsyncThunk("cart/registerCart", async () => {
  const response = fetch(`${API_URL}/api/cart/register`, {
    method: "POST",
    credentials: "include",
  });

  return await response.json();
});

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  status: "idle",
  accessKey: null,
  error: null,
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
      const { id, img, title, dateDelivery, price, count = 1 } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.count = count;
      } else {
        state.items.push({ id, img, title, dateDelivery, price, count });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("registerCart/pending", (state) => {
        state.status = "loading";
      })
      .addCase("registerCart/fulfilled", (state, action) => {
        state.status = "success";
        state.accessKey = action.payload;
      })
      .addCase("registerCart/rejected", (state, action) => {
        state.status = "failed";
        state.accessKey = "";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
export const { toggleCart, closeCart, addItemToCart } = cartSlice.actions;
