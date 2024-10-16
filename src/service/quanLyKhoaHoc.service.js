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

  postThemKhoaHoc: (accessToken, data) => {
    return http.post(`QuanLyKhoaHoc/ThemKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postThemKhoaHocUploadHinh: (formData) => {
    return http.post(
      "/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
      formData
      //    {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // }
    );
  },
  postUploadHinhAnhKhoaHoc: (formData, accessToken) => {
    return http.post("/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  putCapNhatKhoaHoc: (data) => {
    return http.put(`QuanLyKhoaHoc/CapNhatKhoaHoc`, data);
  },
  postCapNhatKhoaHoc: (formdata) => {
    return http.post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formdata);
  },

  deleteKhoaHoc: (MaKhoaHoc, accessToken) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${MaKhoaHoc}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  postDangkyKhoaHoc: (accessToken, data) => {
    return http.post(`QuanLyKhoaHoc/DangKyKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postHuyGhiDanh: (accessToken, data) => {
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
  postGhiDanhKhoaHoc: (enrollData, accessToken) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", enrollData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getLayDanhSachNguoiDungChuaGhiDanh: (course, accessToken) => {
    const courseCode = course.maKhoaHoc;
    const requestData = { maKhoaHoc: courseCode };

    return http.post(
      `/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh `,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  postLayDanhSachHocVienChoXetDuyet: (courseCode, accessToken) => {
    const data = { maKhoaHoc: courseCode };
    return http.post(`/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postDanhSachHocVienKhoaHoc: (courseCode, accessToken) => {
    const data = { maKhoaHoc: courseCode };
    return http.post(`/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  deletedHuyGhiDanh: (courseCode, taiKhoan, accessToken) => {
    const data = { maKhoaHoc: courseCode, taiKhoan: taiKhoan };
    return http.post("/QuanLyKhoaHoc/HuyGhiDanh", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  layDanhSachKhoaHoc: (data) => {
    return http.get(
      `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${data}&MaNhom=GP01`
    );
  },
  layToanBoDanhSachKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },
};
