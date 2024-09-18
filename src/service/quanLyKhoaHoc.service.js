import { http } from "./config";

export const quanLyKhoaHocService = {
  getDanhSachKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
  getDanhMucKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getThongTinKhoaHoc: (maKhoaHoc) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },
  postGhiDanhKhoaHoc: (data, token) => {
    return http.post(`/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data, {
      headers: { token },
    });
  },
};
