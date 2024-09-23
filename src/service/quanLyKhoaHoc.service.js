import { http } from "./config";

export const quanLyKhoaHocService = {
  getDanhSachKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
  getDanhSachKhoaHocTheoTrang: (page,pageSize) => {
    return http.get(`/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=${pageSize}`);
  },

  getDanhMucKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getThongTinKhoaHoc: (maKhoaHoc) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },
  postGhiDanhKhoaHoc: (data,accessToken) => {
    return http.post(`/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data, {
      Authorization: `Bearer ${accessToken}`
    });
  },
  
  postGhiDanhKhoaHoc: (data, accessToken) => {
    return http.post(`/QuanLyKhoaHoc/HuyGhiDanh`, data, {

      Authorization: `Bearer ${accessToken}`,
    });
  },
};
