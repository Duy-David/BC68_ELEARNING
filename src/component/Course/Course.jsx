import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Tabs } from "antd";
import CourseCard from "../CourseCard/CourseCard";
import "./course.scss"
const Course = () => {
  const [listCourse, setListCourse] = useState([]);
  const [listCourseCategory, setListCoursCategory] = useState([]);
  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        console.log(res.data);
        setListCoursCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    quanLyKhoaHocService
      .getDanhSachKhoaHoc()
      .then((res) => {
        console.log(res.data);
        setListCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const items = listCourseCategory.map((category, index) => ({
    label: category.tenDanhMuc,
    key: category.maDanhMuc,
    children: (
      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {listCourse
          .filter(
            (course) =>
              course.danhMucKhoaHoc.maDanhMucKhoahoc === category.maDanhMuc
          )
          .slice(0, 10 ) 
          .map((course) => (
            <div key={course.maKhoaHoc} className="course-item">
              <CourseCard course={course} />
            </div>
          ))}
      </div>
    ),
  }));
  return (
    <div className="container my-10">
      <h2 className="text-3xl font-semibold relative text-gray-900 mb-7 course-title">
      Top <span className="">Course</span>
      </h2>

      <Tabs
        defaultActiveKey="1"
        centered
        items={items} 
      />
    </div>
  );
};

export default Course;
