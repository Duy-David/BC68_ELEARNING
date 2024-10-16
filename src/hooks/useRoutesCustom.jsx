import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { pathChildren, pathDefault } from "../common/path";
import { Skeleton } from "antd";
import { svgPathData } from "@fortawesome/free-brands-svg-icons/faAirbnb";
// import ManagerUserRegister from "";

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
const UnderConstructionPage = React.lazy(() =>
  import("../pages/NotFound404/UnderConstructionPage")
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
const ManagerUserRegister = React.lazy(() =>
  import("../pages/ManagerUserRegister/ManagerUserRegister")
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
          path: pathChildren.managerUserRegister,
          // index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManagerUserRegister />
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

    {
      path: pathDefault.underConstruction,
      element: (
        <Suspense fallback={<Skeleton />}>
          <UnderConstructionPage />
        </Suspense>
      ),
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
