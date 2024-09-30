export const notiValidate = {
  empty: "Vui lòng không bỏ trống",
  email: "Vui lòng nhập đúng định dạng email",
  username: "Tài khoản tối thiểu",
  fullname: "Vui lòng nhập tên không có số",
  password:
    "Mật khẩu ít nhất 8 ký tự và phải có ít nhất 1 chữ viết HOA, 1 số và 1 ký tự đặc biệt",
  re_password: "Mật khẩu nhập không giống với mật khẩu đã nhập trước",
  phone: "Vui lòng nhập đúng định dạng số điện thoại VN",
  term: "Vui lòng đồng ý điều khoản bảo mật",
  date: "Vui lòng nhập đúng định dang DD/MM/YYYY",
  min: (minValue) => {
    return `Vui lòng nhập tối thiểu ${minValue} ký tự`;
  },
  max: (maxValue) => {
    return `Vui lòng nhập tối đa ${maxValue} ký tự`;
  },
};
