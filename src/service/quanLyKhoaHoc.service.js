import { http } from "./config";

export const quanLyKhoaHocService = {
  getDanhSachKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
  getDanhSachKhoaHocTheoTrang: (page, pageSize) => {
    return http.get(
      `/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=${pageSize}`
    );
  },

  getDanhMucKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getThongTinKhoaHoc: (maKhoaHoc) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },
  // postGhiDanhKhoaHoc: (data, accessToken, add = "Bearer") => {
  //   return http.post(`/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data, {
  //     Authorization: `Bearer ${accessToken}`
  //   });
  // },
  postThemKhoaHoc: (accessToken, data) => {
    return http.post(`QuanLyKhoaHoc/ThemKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  putCapNhatKhoaHoc: (kh) => {
    return http.put(`QuanLyKhoaHoc/CapNhatKhoaHoc`, kh, {});
  },
  deleteKhoaHoc: (MaKhoaHoc, accessToken) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${MaKhoaHoc}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postGhiDanhKhoaHoc: (accessToken, data) => {
    return http.post(`QuanLyKhoaHoc/GhiDanhKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postDangkyKhoaHoc: ( accessToken, data) => {
    return http.post(`QuanLyKhoaHoc/DangKyKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postHuyGhiDanh: ( accessToken, data) => {
    return http.post(`QuanLyKhoaHoc/HuyGhiDanh`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  searchKhoaHocTheoTen: (tenKhoaHoc) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}`
    );
  },
};
