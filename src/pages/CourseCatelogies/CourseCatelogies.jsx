import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import CourseCard from "../../component/CourseCard/CourseCard";
import { useParams } from "react-router-dom";

const CourseCatelogies = () => {
  const { maDanhMuc } = useParams(); 
  console.log(maDanhMuc)
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
            course.danhMucKhoaHoc.maDanhMucKhoahoc === maDanhMuc.replace(":","")
      
        )
        .map((course) => (
          <div key={course.maKhoaHoc} className="course-item">
            <CourseCard course={course} />
          </div>
        ))}
    </div>
  );
};

export default CourseCatelogies;
