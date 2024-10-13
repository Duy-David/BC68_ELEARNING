import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Button, Dropdown, Popover, Tabs } from "antd";
import CourseCard from "../CourseCard/CourseCard";
import "./course.scss";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { setListCourse, setListCourseCategory } from "../../redux/courseSlice";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import IconCategory from "../Icon/Iconheaders";
const Course = () => {
  const isResponsive = useResponsive({
    sm: 640,
    md: 768,
    lg: 1024,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        dispatch(setListCourseCategory(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    quanLyKhoaHocService
      .getDanhSachKhoaHoc()
      .then((res) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  const { listCourse, listCourseCategory } = useSelector(
    (state) => state.courseSlice
  );
  const [activeTab, setActiveTab] = useState(
    listCourseCategory[0]?.maDanhMuc || ""
  );

  const handleTabClick = (maDanhMuc) => {
    setActiveTab(maDanhMuc);
  };

  // console.log(listCourseCategory);
  const sortedCourses = (courses) => {
    return courses.sort((a, b) => b.luotXem - a.luotXem).slice(0, 5);
  };

  const items = listCourseCategory.map((category, index) => ({
    key: category.tenDanhMuc,
    label: (
      <Button
        onClick={() => handleTabClick(category.maDanhMuc)}
        className={`px-4 py-2 border rounded-lg transition-colors duration-200 xl:text-md  ${
          activeTab === category.maDanhMuc
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700"
        } hover:bg-blue-500 hover:text-white`}
      >
        {category.tenDanhMuc}
      </Button>
    ),
  }));

  return (
    <div className="container my-12 px-3 mx-auto">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold relative text-gray-900 mb-7 course-title">
          Top <mark>Course</mark>
        </h2>

        <div className="mb-2">
          {!isResponsive.lg ? (
            <div className="flex flex-wrap justify-center md:gap-3 gap-5">
              {listCourseCategory.map((category) => (
                <button
                  key={category.maDanhMuc}
                  onClick={() => handleTabClick(category.maDanhMuc)}
                  className={`px-4 py-2 border rounded-lg transition-colors duration-200 xl:text-md  ${
                    activeTab === category.maDanhMuc
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  } hover:bg-blue-500 hover:text-white`}
                >
                  {category.tenDanhMuc}
                </button>
              ))}
            </div>
          ) : (
            <div className="">
              {" "}
              <Dropdown
                menu={{
                  items,
                }}
                placement="topLeft"
                arrow
              >
                <Button>
                  <div className="category_icon">
                    <IconCategory />
                  </div>
                </Button>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {listCourseCategory.map((category) => (
          <div
            key={category.maDanhMuc}
            className={`${
              activeTab === category.maDanhMuc ? "block" : "hidden"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-6 xl:gap-10">
              {sortedCourses(
                listCourse.filter(
                  (course) =>
                    course.danhMucKhoaHoc.maDanhMucKhoahoc ===
                    category.maDanhMuc
                )
              ).map((course) => (
                <div key={course.maKhoaHoc} className="course-item">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
