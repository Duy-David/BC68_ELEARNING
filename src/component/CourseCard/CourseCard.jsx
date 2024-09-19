import React from "react";

const CourseCard = ({ course }) => {
  console.log(course);
  return (
    <div className=" rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Course Image */}
      <div className="relative">
        <img
          className="w-full h-48"
          src={course.hinhAnh} // Replace with actual image
          alt="Course"
        />
        {/* Free Label */}
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          Featured
        </span>
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Course Level */}
        <span className="inline-block bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full">
          Beginner
        </span>

        {/* Course Title */}
        <h3 className="text-sm font-bold mt-2 mb-1 h-1/2">
          {course.tenKhoaHoc}
        </h3>

        {/* Course Instructor */}
        <p className="text-sm font-medium mb-2">
          Giảng viên: {course.nguoiTao.hoTen}
        </p>

        {/* Course view */}
        <p className="text-lg font-bold text-green-500">
          {" "}
          Lượt xem: {course.luotXem}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
