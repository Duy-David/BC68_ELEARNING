import ManagerUserRegister from "../pages/ManagerUserRegister/ManagerUserRegister";

export const pathDefault = {
  homePage: "/",
  notFound: "*",
  // register: "/dang-ky",
  // login: "/dang-nhap",
  searchCourse: "/search-course",
  admin: "/admin",
  courseCatelogies: "/course-catelogies/:maDanhMuc",
  detailCourse: "/course-catelogies/detail-course/:maKhoaHoc",
  personalInfornation: "personal-infornation/:hoTen",
  underConstruction: "/dang-xay-dung",
};

export const pathChildren = {
  ...pathDefault,
  adminLogin: pathDefault.admin + "/login",
  managerUser: pathDefault.admin + "/manager-user",
  managerUserRegister: pathDefault.admin + "/manager-user-register/:taiKhoan",
  createUser: pathDefault.admin + "/create-user",
  managerCourse: pathDefault.admin + "/manager-course",
  createCourse: pathDefault.admin + "/create-course",
  enrollCourse: pathDefault.admin + "/ghi-danh-khoa-hoc/:maKhoaHoc",
};
