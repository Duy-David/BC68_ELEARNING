import { http } from "./config";

export const nguoiDungService = {
  putThongTinNguoiDung: (data, token) => {
    return http.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUserEnrolledCourses: (accessToken, data) => {
    return http.post("/QuanLyNguoiDung/ThongTinTaiKhoan", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  layDanhSachKhoaHocChuaDangKy: (accessToken, taiKhoan) => {
    return http.post(
      `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  layDanhSachKhoaHocChoXetDuyet: (accessToken, data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  layDanhSachKhoaHocDaXetDuyet: (accessToken, data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  layDanhSachNguoiDung: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
  timKiemNguoiDung: (taiKhoan) => {
    return http.get(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`
    );
  },
  themNguoiDung: (accessToken, data) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteUser: (accessToken, taiKhoan) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
