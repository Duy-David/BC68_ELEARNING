import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../util/util";

const initialState = {
  user: getLocalStorage("user"),
};

const authSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    setValueUser: (state, actions) => {
      // console.log(actions);
      // console.log("users", actions);
      state.user = actions.payload;
    },
  },
});

export const { setValueUser } = authSlice.actions;

export default authSlice.reducer;
