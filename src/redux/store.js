import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import choicesReducer from "./choicesSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    choices: choicesReducer,
  },
});

export default store;
