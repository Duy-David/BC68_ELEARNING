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
  postGhiDanhKhoaHoc: (data, token, add = "Bearer") => {
    return http.post(`/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data, {
      headers: { token },
    });
  },
  postGhiDanhKhoaHoc: (data, token) => {
    return http.post(`/QuanLyKhoaHoc/DangKyKhoaHoc`, data, {
      headers: { token },
    });
  },
  postGhiDanhKhoaHoc: (data, token) => {
    return http.post(`/QuanLyKhoaHoc/HuyGhiDanh`, data, {
      headers: { token },
    });
  },
  searchKhoaHocTheoTen: (tenKhoaHoc) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}`
    );
  },
};
