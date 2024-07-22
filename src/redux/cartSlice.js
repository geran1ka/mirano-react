import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";

export const registerCart = createAsyncThunk("cart/registerCart", async () => {
  try {
    const response = await fetch(`${API_URL}/api/cart/register`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Ошибка при регистрации");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  isOpen: false,
  items: [],
  status: "idle",
  accessKey: null,
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Ошибки при получении данных с корзины");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
});

export const addItemToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить товар в корзину");
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  },
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerCart.fulfilled, (state, action) => {
        state.status = "success";
        state.accessKey = action.payload;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = "failed";
        state.accessKey = "";
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
export const { toggleCart, closeCart } = cartSlice.actions;
