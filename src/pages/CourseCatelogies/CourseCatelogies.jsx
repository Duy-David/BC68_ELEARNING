import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import CourseCard from "../../component/CourseCard/CourseCard";
import { Link, useParams } from "react-router-dom";

const CourseCatelogies = () => {
  const { maDanhMuc } = useParams();
  console.log(maDanhMuc);
  // console.log(maKhoaHoc)
  const [listCourse, setListCourse] = useState([]);
  useEffect(() => {
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {listCourse
        .filter(
          (course) =>
            course.danhMucKhoaHoc.maDanhMucKhoahoc ===
            maDanhMuc.replace(":", "")
        )
        .map((course) => (
          <Link key={course.maKhoaHoc} to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}>
            <div key={course.maKhoaHoc} className="course-item">
              <CourseCard course={course} />
            </div>
          </Link>
        ))}
    </div>
  );
};

export default CourseCatelogies;
