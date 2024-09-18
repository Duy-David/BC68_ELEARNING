import { http } from "./config";

export const nguoiDungService = {
  putThongTinNguoiDung: (data, token) => {
    return http.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data, {
      headers: { token },
    });
  },
};
