import { createSlice } from "@reduxjs/toolkit";
import { isNumber } from "../util";

const initialState = {
  type: "bouquets",
  minPrice: "",
  maxPrice: "",
  category: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      state.minPrice = "";
      state.maxPrice = "";
      state.category = "";
    },
    changePrice(state, action) {
      if (isNumber(action.payload.value) || action.payload.value === "") {
        state[action.payload.name] = action.payload.value;
      }
    },
  },
});

export const { changeType, changePrice } = filtersSlice.actions;

export default filtersSlice.reducer;
