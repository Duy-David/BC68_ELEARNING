import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../util/util";

const initialState = {
  cartItems: getLocalStorage("cartItems") || [], // Khởi tạo mảng trống cho giỏ hàng
  totalAmount: 0, // Tổng tiền ban đầu là 0
};
const updateLocalStorage = (cartItems) => {
  setLocalStorage("cartItems", cartItems);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      console.log(course);
      const existingCourse = state.cartItems.find((item) => {
        item.maKhoaHoc == course.maKhoaHoc;
      });
      const coursePrice = 49;

      if (!existingCourse) {
        state.cartItems.push({
          ...course,
          quantity: 1,
          giaTien: coursePrice,
        });
      } else {
        existingCourse.quantity += 1;
      }
      state.totalAmount += coursePrice;
      updateLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const courseIndex = state.cartItems.findIndex(
        (item) => item.maKhoaHoc == courseId
      );

      if (courseIndex !== -1) {
        // Subtract the total price of the course
        const courseToRemove = state.cartItems[courseIndex];
        state.totalAmount -= courseToRemove.giaTien * courseToRemove.quantity;

        // Remove the course from the cart
        state.cartItems.splice(courseIndex, 1);
        updateLocalStorage(state.cartItems);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;