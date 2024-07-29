import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";
import { fetchCart, toggleCart } from "./cartSlice";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (_, { getState, dispatch }) => {
    const {
      order: {
        data: {
          buyerName,
          buyerPhone,
          recipientName,
          recipientPhone,
          street,
          house,
          apartment,
          paymentOnline,
          deliveryDate,
          deliveryTime,
        },
      },
    } = getState();
    const orderData = {
      buyer: {
        name: buyerName,
        phone: buyerPhone,
      },
      recipient: {
        name: recipientName,
        phone: recipientPhone,
      },
      address: `${street}, дом ${house}, кв ${apartment}`,
      paymentOnline,
      deliveryDate,
      deliveryTime,
    };

    const response = await fetch(`${API_URL}`);

    dispatch(clearOrder());
    dispatch(toggleCart());
    dispatch(fetchCart());

    return await response.json();
  },
);

const initialState = {
  isOpenCart: false,
  orederId: "",
  data: {
    buyerName: "",
    buyerPhone: "",
    recipientName: "",
    recipientPhone: "",
    street: "",
    house: "",
    apartment: "",
    paymentOnline: true,
    deliveryDate: "",
    deliveryTime: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openOrder(state) {
      state.isOpenCart = true;
    },
    closeOrder(state) {
      state.isOpenCart = false;
    },
    clearOrder(state) {
      state.data = {
        buyerName: "",
        buyerPhone: "",
        recipientName: "",
        recipientPhone: "",
        street: "",
        house: "",
        apartment: "",
        paymentOnline: "true",
        deliveryDate: "",
        deliveryTime: "",
      };
    },
    updateOrderData(state, action) {
      // state.data[action.payload.name] = action.payload.value;
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export default orderSlice.reducer;
export const { openOrder, closeOrder, clearOrder, updateOrderData } =
  orderSlice.actions;
