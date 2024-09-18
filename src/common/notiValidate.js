export const notiValidate = {
  empty: "Vui lòng không bỏ trống",
  email: "Vui lòng nhập đúng định dạng email",
  password:
    "Mật khẩu ít nhất 8 ký tự và phải có ít nhất 1 chữ viết HOA, 1 số và 1 ký tự đặc biệt",
  min: (minValue) => {
    return `Vui lòng nhập tối thiểu ${minValue}`;
  },
  max: (maxValue) => {
    return `Vui lòng nhập tối đa ${maxValue}`;
  },
};
