import { http } from "./config";

export const authService = {
  signIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
};