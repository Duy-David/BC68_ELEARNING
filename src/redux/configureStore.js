import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import headerSlice from "./headerSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    headerSlice,
  },
});
