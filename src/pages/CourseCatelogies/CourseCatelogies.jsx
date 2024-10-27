import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import CourseCard from "../../component/CourseCard/CourseCard";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import WithLoading from "../../component/WithLoading/WithLoading";

const CourseCatelogies = () => {
  const { maDanhMuc } = useParams();
   const [listCourse, setListCourse] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  // const { listCourse } = useSelector((state) => state.courseSlice);
  useEffect(() => {
    if (listCourse.length === 0) {
      quanLyKhoaHocService
        .getDanhSachKhoaHoc()
        .then((res) => {
          setListCourse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listCourse]);
  const filteredCourses = listCourse.filter(
    (course) =>
      course.danhMucKhoaHoc.maDanhMucKhoahoc === maDanhMuc.replace(":", "")
  );

  useEffect(() => {
    if (filteredCourses.length > 0) {
      setCategoryName(filteredCourses[0].danhMucKhoaHoc.tenDanhMucKhoaHoc);
    }
  }, [maDanhMuc, listCourse]);
  return (
    <WithLoading>
      <div className="container mx-auto pb-10 px-3">
        <Breadcrumb
          className="my-4"
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: (
                <Link to={`/course-catelogies/${maDanhMuc}`}>
                  {maDanhMuc.replace(":", "")}
                </Link>
              ),
            },
            {
              title: <p>{categoryName}</p>, // Hiển thị tên danh mục
            },
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-10 ">
          {filteredCourses.map((course, index) => (
            <div className="course-item" key={index}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </WithLoading>
  );
};

export default CourseCatelogies;
