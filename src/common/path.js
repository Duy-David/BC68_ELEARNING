export const pathDefault = {
  homePage: "/",
  notFound: "*",
  register: "/dang-ky",
  login: "/dang-nhap",
  searchCourse: "/search-course",

  admin: "/admin",
};

export const pathChildren = {
  ...pathDefault,
  adminLogin: pathDefault.admin + "/login",
  managerUser: pathDefault.admin + "/manager-user",
  createUser: pathDefault.admin + "/create-user",
  managerCourse: pathDefault.admin + "/manager-Course",
  createCourse: pathDefault.admin + "/create-Course",
};
