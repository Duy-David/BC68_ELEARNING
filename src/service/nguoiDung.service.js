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
