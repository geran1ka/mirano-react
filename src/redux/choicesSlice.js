import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "цветы",
};

const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    toggleName(state, action) {
      console.log("action: ", action);
      state.title = action.payload;
    },
  },
});

export default choicesSlice.reducer;

export const { toggleName } = choicesSlice.actions;
