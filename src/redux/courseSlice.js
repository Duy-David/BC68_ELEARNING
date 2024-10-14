import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../util/util";
import { quanLyKhoaHocService } from "../service/quanLyKhoaHoc.service";


export const getValueCourseAPI = createAsyncThunk(
  "/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
  async (_, ThunkAPI) => {
    const result = await quanLyKhoaHocService.getDanhSachKhoaHoc();
    return result.data.content;
  }
);

const initialState = {
  listCourse: getLocalStorage("listCourse") || [], // Đảm bảo có dữ liệu ban đầu
  listCourseCategory: getLocalStorage("listCourseCategory") || [],
};

const courseSlice = createSlice({
  name: "KhoaHoc",
  initialState,
  reducers: {
    setListCourse: (state, actions) => {
      state.listCourse = actions.payload;
      setLocalStorage("listCourse", actions.payload); 
    },
    setListCourseCategory: (state, actions) => {
      state.listCourseCategory = actions.payload;
      setLocalStorage("listCourseCategory", actions.payload);   
    },
  },
});

export const { setListCourse, setListCourseCategory } = courseSlice.actions;

export default courseSlice.reducer;
