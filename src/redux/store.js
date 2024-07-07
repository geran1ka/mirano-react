import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import choicesReducer from "./choicesSlice";
import goodsReducer from "./goodsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    choices: choicesReducer,
    goods: goodsReducer,
  },
});

export default store;
