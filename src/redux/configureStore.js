import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import headerSlice from "./headerSlice";
import cartSlice from "./cartSlice";
import courseSlice from "./courseSlice";





export const store = configureStore({
  reducer: {
    authSlice,
    headerSlice,
    cartSlice,
    courseSlice,
  },
});
