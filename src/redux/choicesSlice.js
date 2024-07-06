import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenChoicePrice: false,
  isOpenChoiceTypeGoods: false,
};

const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    toggleChoicePrice(state) {
      state.isOpenChoicePrice = !state.isOpenChoicePrice;
    },
    closeChoicePrice(state) {
      state.isOpenChoicePrice = false;
    },
    toggleChoiceTypeGoods(state) {
      state.isOpenChoiceTypeGoods = !state.isOpenChoiceTypeGoods;
    },
    closeChoiceTypeGoods(state) {
      state.isOpenChoiceTypeGoods = false;
    },
  },
});

export default choicesSlice.reducer;

export const {
  toggleChoicePrice,
  closeChoicePrice,
  toggleChoiceTypeGoods,
  closeChoiceTypeGoods,
} = choicesSlice.actions;
