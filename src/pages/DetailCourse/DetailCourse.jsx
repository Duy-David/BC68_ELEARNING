import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Breadcrumb, Rate } from "antd";
import CourseInfo from "../../component/CourseInfo/CourseInfo";
import CheckIcon from "../../component/Icon/CheckIcon";
import DateToWords from "../../component/DateToWords/DateToWords";
import WithLoading from "../../component/WithLoading/WithLoading";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../component/CourseCard/CourseCard";
const DetailCourse = () => {
  const { maKhoaHoc } = useParams();
  const dispatch = useDispatch();
  const learningObjectives = [
    "Ready to begin working on real-world data modeling projects.",
    "Expanded responsibilities as part of an existing role.",
    "Find a new position involving data modeling.",
  ];

  const requirements = [
    "Basic understanding of data management concepts and constructs such as relational database tables.",
    "Know how different pieces of data logically relate to one another.",
  ];
  const paragraphs = [
    `In this course, I take you from the fundamentals and concepts of
     data modeling all the way through a number of specific concepts,
     techniques, and implementations used in modern data management.
     You'll learn many key concepts and best practices that lay the
     foundation for mastering concepts like conceptual, logical, and
     physical data modeling.`,

    `Not only will you understand the theory and the best principles
     to work by, but also to make the key decisions about designs and
     techniques required by the specific tasks to maximize the value
     and benefits of your data models.`,

    `Through a number of organizations, they establish the need for
     master data management when they handle key entities such as
     customers or products in different locations. Good data modeling
     can dramatically improve the efficiency and accuracy of large
     data models.`,
  ];
  const [detailCourse, setDetailCourse] = useState(null);

  useEffect(() => {
    quanLyKhoaHocService
      .getThongTinKhoaHoc(maKhoaHoc)
      .then((res) => {
        setDetailCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maKhoaHoc]);

  const { listCourse } = useSelector((state) => state.courseSlice);
  // useEffect(() => {
  //   if (listCourse.length === 0) {
  //     dispatch(fetchCourses()); 
  //   }
  // }, [listCourse, dispatch]);
  const relatedCourses = detailCourse
    ? listCourse
        .filter(
          (course) =>
            course?.danhMucKhoaHoc.maDanhMucKhoahoc ===
              detailCourse?.danhMucKhoaHoc.maDanhMucKhoahoc &&
            course.maKhoaHoc !== detailCourse.maKhoaHoc
        )
        .sort((a, b) => b.luotXem - a.luotXem)
        .slice(0, 5)
    : [];

  return (
    <WithLoading>
      <div className="container mx-auto pb-10 px-3">
        <Breadcrumb
          className=" my-4"
          items={[
            {
              title: "Home",
            },
            {
              title: (
                <Link
                  to={`/course-catelogies/${detailCourse?.danhMucKhoaHoc.maDanhMucKhoahoc}`}
                >
                  {detailCourse?.danhMucKhoaHoc.maDanhMucKhoahoc}
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to={`/course-catelogies/${detailCourse?.danhMucKhoaHoc.maDanhMucKhoahoc}`}
                >
                  {detailCourse?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                </Link>
              ),
            },
            {
              title: `${detailCourse?.tenKhoaHoc}`,
            },
          ]}
        />
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div className="mx-auto col-span-2  mr-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4">
                {detailCourse?.tenKhoaHoc}
              </h2>
              <p className="mb-5">{detailCourse?.moTa}</p>

              <div className="flex sm:items-center flex-wrap flex-col sm:flex-row gap-4 text-sm text-gray-600 mt-2 border-y  py-3">
                <span className="pr-4 sm:border-r-2">
                  <strong>{detailCourse?.nguoiTao?.hoTen}</strong>
                </span>
                <span className="pr-4 sm:border-r-2">
                  Last Updated:
                  {<DateToWords dateInput={detailCourse?.ngayTao} />}
                </span>
                <div className="flex items-center pr-4 sm:border-r-2">
                  <span>
                    <strong>4.5</strong>/5{" "}
                    <Rate allowHalf defaultValue={4.5} disabled />
                  </span>
                  <span className="ml-2">
                    ({detailCourse?.luotXem} reviews)
                  </span>
                </div>
                <span>
                  {`${detailCourse?.soLuongHocVien} already enrolled`}{" "}
                </span>
              </div>
            </div>
            {/* course img */}
            <div className=" my-8">
              <img
                src={detailCourse?.hinhAnh || "/png/course/hinhAnhCourse.png"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/png/course/hinhAnhCourse.png";
                }}
                alt="Course"
                className="w-full"
              />
            </div>

            {/* Course Prerequisites */}
            <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 mb-6">
              <h2 className="text-lg font-bold">Course Prerequisites</h2>
              <p className="text-gray-600 text-sm mt-2">
                Please note that this course has the following prerequisites
                which must be completed before it can be accessed:
              </p>
              <div className="mt-4">
                <div className="inline-block text-blue-600 bg-gray-100 px-4 py-2 rounded-md">
                  Artificial Intelligence & Machine Learning
                </div>
              </div>
            </div>

            {/* About This Course */}
            <div className="mb-6">
              <h2 className="text-lg font-bold">About This Course</h2>
              {paragraphs.map((paragraph, index) => (
                <p className="text-gray-600 mt-4" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Learning Objectives */}
            <div className="bg-gray-50 p-6 mb-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Learning Objectives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckIcon color="text-green-500" />
                    <span className="text-gray-600">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckIcon color="text-blue-500" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" my-5 col-span-2 md:col-span-1  ">
            <div className=" sticky top-4 md:top-16 bg-white p-4  col-span-1">
              <CourseInfo detailCourse={detailCourse} maKhoaHoc={maKhoaHoc} />
            </div>
          </div>
        </div>
        {/* relatedCourses */}
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Related Courses</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-6 xl:gap-10">
            {relatedCourses.map((course, index) => {
              return <CourseCard key={index} course={course} />;
            })}
          </ul>
        </div>
      </div>
    </WithLoading>
  );
};

export default DetailCourse;
