import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import goodsReducer from "./goodsSlice";
import filtersReducer from "./filtersSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    goods: goodsReducer,
    filters: filtersReducer,
    search: searchReducer,
  },
});

export default store;
