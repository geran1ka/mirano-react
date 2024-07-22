// rcslice - снипет разворачивания slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";

export const fetchGoods = createAsyncThunk(
  "goods/fetchGoods",
  async (params) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_URL}/api/products${queryString ? `?${queryString}` : ""}`,
      );

      if (!response.ok) {
        throw new Error("Не удалось получить данные по товарам");
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoods.fulfilled, (state, actions) => {
        state.status = "success";
        state.items = actions.payload;
      })
      .addCase(fetchGoods.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.error.message;
      });
  },
});

export default goodsSlice.reducer;
