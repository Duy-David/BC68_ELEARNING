import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
// import Usertemplate from "../template/Usertemplate/Usertemplate";
import { pathChildren, pathDefault } from "../common/path";
// import HomePage from "../pages/Home/HomePage";
// import Register from "../pages/Register/Register";
// import LoginPage from "../pages/LoginPage/LoginPage";
// import CourseCatelogies from "../pages/CourseCatelogies/CourseCatelogies";
// import DetailCourse from "../pages/DetailCourse/DetailCourse";
// import PersonalInformation from "../pages/PersonalInformation/PersonalInformation";
// import SearchCourseResult from "../pages/SearchCourse/SearchCourseResult";
// import AdminTemplate from "../template/Admintemplate/AdminTemplate";
import { Skeleton } from "antd";
import { svgPathData } from "@fortawesome/free-brands-svg-icons/faAirbnb";

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
const NotFound404 = React.lazy(() =>
  import("../pages/NotFound404/NotFound404")
);
const CourseCatelogies = React.lazy(() =>
  import("../pages/CourseCatelogies/CourseCatelogies")
);
const DetailCourse = React.lazy(() =>
  import("../pages/DetailCourse/DetailCourse")
);
const PersonalInformation = React.lazy(() =>
  import("../pages/PersonalInformation/PersonalInformation")
);
const SearchCourseResult = React.lazy(() =>
  import("../pages/SearchCourse/SearchCourseResult")
);
const HomePage = React.lazy(() => import("../pages/Home/HomePage"));
const Usertemplate = React.lazy(() =>
  import("../template/Usertemplate/Usertemplate")
);
const AdminTemplate = React.lazy(() =>
  import("../template/Admintemplate/AdminTemplate")
);
const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: (
        <Suspense fallback={<Skeleton />}>
          <Usertemplate />
        </Suspense>
      ),
      children: [
        {
          path: pathDefault.homePage,
          element: (
            <Suspense fallback={<Skeleton />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: pathDefault.courseCatelogies,
          element: (
            <Suspense fallback={<Skeleton />}>
              <CourseCatelogies />
            </Suspense>
          ),
        },
        {
          path: pathDefault.detailCourse,
          element: (
            <Suspense fallback={<Skeleton />}>
              <DetailCourse />
            </Suspense>
          ),
        },
        {
          path: pathDefault.personalInfornation,
          element: (
            <Suspense fallback={<Skeleton />}>
              <PersonalInformation />
            </Suspense>
          ),
        },
        {
          path: pathDefault.searchCourse,
          element: (
            <Suspense fallback={<Skeleton />}>
              <SearchCourseResult />
            </Suspense>
          ),
        },
      ],
    },
    // {
    //   path: pathDefault.register,
    //   element: <Register />,
    // },
    // {
    //   path: pathDefault.login,
    //   element: <LoginPage />,
    // },
    {
      path: pathDefault.admin,
      element: (
        <Suspense fallback={<Skeleton />}>
          <AdminTemplate />
        </Suspense>
      ),
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
      element: (
        <Suspense fallback={<Skeleton />}>
          <NotFound404 />
        </Suspense>
      ),
    },
  ]);

  return routes;
};

export default useRoutesCustom;
