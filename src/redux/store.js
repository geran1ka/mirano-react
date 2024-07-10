import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import goodsReducer from "./goodsSlice";
import choicesReducer from "./choicesSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    goods: goodsReducer,
    choices: choicesReducer,
  },
});

export default store;
