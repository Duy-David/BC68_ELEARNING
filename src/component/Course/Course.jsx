import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Popover, Tabs } from "antd";
import CourseCard from "../CourseCard/CourseCard";
import "./course.scss";
import { Link } from "react-router-dom";
// import {  Popover } from "antd";
import CourseInfo from "../CourseInfo/CourseInfo";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { setListCourse, setListCourseCategory } from "../../redux/courseSlice";

const Course = () => {
  const screenSize = useResponsive();
  const dispatch = useDispatch();
  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        console.log(res.data);
        dispatch(setListCourseCategory(res.data));
      })
      .catch((err) => {
        // console.log(err);
      });

    quanLyKhoaHocService
      .getDanhSachKhoaHoc()
      .then((res) => {
        console.log(res.data);
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  const { listCourse, listCourseCategory } = useSelector(
    (state) => state.courseSlice
  );

  // console.log(listCourseCategory);

  console.log(listCourse);
  const items = listCourseCategory.map((category, index) => ({
    label: <div className="text-2xl font-medium">{category.tenDanhMuc}</div>,
    key: category.maDanhMuc,
    children: (
      <div
        key={index}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
      >
        {listCourse
          .filter(
            (course) =>
              course.danhMucKhoaHoc.maDanhMucKhoahoc === category.maDanhMuc
          )
          .slice(0, 10)
          .map((course) => (
            <Link
              key={course.maKhoaHoc}
              to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}
            >
              {/* <Popover content={<CourseInfo course={course} />}> */}
              <div key={course.maKhoaHoc} className="course-item">
                <CourseCard course={course} />
              </div>
              {/* </Popover> */}
            </Link>
          ))}
      </div>
    ),
  }));
  return (
    <div className="container my-10">
      <h2 className="text-3xl font-semibold relative text-gray-900 mb-7 course-title">
        Top <mark>Course</mark>
      </h2>

      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default Course;
