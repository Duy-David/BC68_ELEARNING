import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import CourseCard from "../../component/CourseCard/CourseCard";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";

const CourseCatelogies = () => {
  const { maDanhMuc } = useParams();
  const [listCourse, setListCourse] = useState([]);
  const [categoryName, setCategoryName] = useState(""); 

  useEffect(() => {
    quanLyKhoaHocService
      .getDanhSachKhoaHoc()
      .then((res) => {
        const filteredCourses = res.data.filter(
          (course) =>
            course.danhMucKhoaHoc.maDanhMucKhoahoc === maDanhMuc.replace(":", "")
        );
        
        setListCourse(filteredCourses);

        // Lấy tên danh mục từ khóa học đầu tiên (nếu có)
        if (filteredCourses.length > 0) {
          setCategoryName(filteredCourses[0].danhMucKhoaHoc.tenDanhMucKhoaHoc);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maDanhMuc]);

  return (
    <div className="container">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {listCourse.map((course) => (
          <Link
            key={course.maKhoaHoc}
            to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}
          >
            <div className="course-item">
              <CourseCard course={course} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseCatelogies;
