import React from "react";
import { useRoutes } from "react-router-dom";
import Usertemplate from "../template/Usertemplate/Usertemplate";
import { pathDefault } from "../common/path";
import HomePage from "../pages/Home/HomePage";
import Register from "../pages/Register/Register";
import LoginPage from "../pages/LoginPage/LoginPage";
import CourseCatelogies from "../pages/CourseCatelogies/CourseCatelogies";
import DetailCourse from "../pages/DetailCourse/DetailCourse";
import PersonalInformation from "../pages/PersonalInformation/PersonalInformation";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <Usertemplate />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/course-catelogies/:maDanhMuc",
          element: <CourseCatelogies />,
        },
        {
          path:  "/course-catelogies/detail-course/:maKhoaHoc",
          element: <DetailCourse/>
        },
        {
          path: "/personal-infornation/:hoTen",
          element: <PersonalInformation/>
        },
      ],
    },
    {
      path: pathDefault.register,
      element: <Register />,
    },
    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
  ]);

  return routes;
};

export default useRoutesCustom;
