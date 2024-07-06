import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
});

export default modalSlice.reducer;
export const { toggleModal, openModal, closeModal } = modalSlice.actions;
