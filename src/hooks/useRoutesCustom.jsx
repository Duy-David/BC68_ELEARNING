import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Usertemplate from "../template/Usertemplate/Usertemplate";
import { pathChildren, pathDefault } from "../common/path";
import HomePage from "../pages/Home/HomePage";
import Register from "../pages/Register/Register";
import LoginPage from "../pages/LoginPage/LoginPage";
import CourseCatelogies from "../pages/CourseCatelogies/CourseCatelogies";
import DetailCourse from "../pages/DetailCourse/DetailCourse";
import PersonalInformation from "../pages/PersonalInformation/PersonalInformation";
import NotFound404 from "../pages/NotFound404/NotFound404";
import SearchCourseResult from "../pages/SearchCourse/SearchCourseResult";
import AdminTemplate from "../template/Admintemplate/AdminTemplate";
import { Skeleton } from "antd";

const ManagerUser = React.lazy(() =>
  import("../pages/ManagerUser/ManagerUser")
);
const ManagerCourse = React.lazy(() =>
  import("../pages/ManagerCourse/ManagerCourse")
);
const CreateUser = React.lazy(() => import("../pages/CreateUser/CreateUser"));

const CreateCourse = React.lazy(() =>
  import("../pages/CreateCourse/CreateCourse")
);
const EnrollCourse = React.lazy(() =>
  import("../pages/EnrollCourse/EnrollCourse")
);

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
          path: "/course-catelogies/detail-course/:maKhoaHoc",
          element: <DetailCourse />,
        },
        {
          path: `personal-infornation/:hoTen`,
          element: <PersonalInformation />,
        },
        {
          path: pathDefault.searchCourse,
          element: <SearchCourseResult />,
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
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
      children: [
        {
          path: pathChildren.managerUser,
          // index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManagerUser />
            </Suspense>
          ),
        },
        {
          path: pathChildren.createUser,
          // index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <CreateUser />
            </Suspense>
          ),
        },
        {
          path: pathChildren.managerCourse,
          // index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManagerCourse />
            </Suspense>
          ),
        },
        {
          path: pathChildren.createCourse,
          // index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <CreateCourse />
            </Suspense>
          ),
        },
        {
          path: pathChildren.enrollCourse,
          element: (
            <Suspense fallback={<Skeleton />}>
              <EnrollCourse />
            </Suspense>
          ),
        },
      ],
    },

    // Route NotFound để dưới cùng
    {
      path: pathDefault.notFound,
      element: <NotFound404 />,
    },
  ]);

  return routes;
};

export default useRoutesCustom;
