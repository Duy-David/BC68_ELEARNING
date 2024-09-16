export const pathDefault = {
  homePage: "/",
  register: "/dang-ky",
  login: "/dang-nhap",
  admin: "/admin",
  adminLogin: "/admin-login",
};

export const pathChildren = {
  ...pathDefault,
  managerUser: pathDefault.admin + "/manager-user",
  createUser: pathDefault.admin + "/create-user",
};
