import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Khởi tạo mảng trống cho giỏ hàng
  totalAmount: 0, // Tổng tiền ban đầu là 0
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
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const existingCourse = state.cartItems.find(
        (item) => item.maKhoaHoc == courseId
      );

      if (existingCourse) {
        state.totalAmount -= existingCourse.giaTien * existingCourse.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.maKhoaHoc !== courseId
        );
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
