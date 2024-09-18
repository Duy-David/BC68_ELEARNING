import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setStatusModal: {
    isLogin: false,
    isRegister: false,
  },
};

const headerSlice = createSlice({
  name: "statusesHeader",
  initialState,
  reducers: {
    setStatusModal: (state, actions) => {
      state.setStatusModal = actions.payload;
    },
  },
});

export const { setStatusModal } = headerSlice.actions;

export default headerSlice.reducer;
