import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import headerSlice from "./headerSlice";
import cartSlice from "./cartSlice";
import courseSlice from "./courseSlice";
import loadingSlice from "./loadingSlice";


// import { cartSlice } from "./CartSlice";


export const store = configureStore({
  reducer: {
    authSlice,
    headerSlice,
    cartSlice,
    courseSlice,
    loadingSlice
  },
});
