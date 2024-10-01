import { http } from "./config";

export const nguoiDungService = {
  putThongTinNguoiDung: (data, token) => {
    return http.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data, {
      headers: { token },
    });
  },
  getUserEnrolledCourses: (accessToken ,data) => {
    return http.post("/QuanLyNguoiDung/ThongTinTaiKhoan", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
