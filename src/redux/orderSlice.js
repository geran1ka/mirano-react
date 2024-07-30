import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";
import { closeCart, fetchCart } from "./cartSlice";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
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

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Не удалось оформить заказ... поробуйте позже!");
      }

      const data = await response.json();
      dispatch(clearOrder());
      dispatch(closeCart());
      dispatch(fetchCart());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  isOpenCart: false,
  orderId: "",
  status: "idle",
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = "loading";
        state.orderId = "";
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.status = "success";
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = "failed";
        state.orderId = "";
      });
  },
});
export const { openOrder, closeOrder, clearOrder, updateOrderData } =
  orderSlice.actions;
export default orderSlice.reducer;
