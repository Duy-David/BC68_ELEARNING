import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { limitCharacter } from "../../util/util";
import { Popover } from "antd";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../../redux/cartSlice";
import { setStatusModal } from "../../redux/headerSlice";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";

const CourseCard = ({ course }) => {
  // const { maKhoaHoc } = useParams();
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const openLogin = () => {
    dispatch(
      setStatusModal({
        isLogin: true,
        isRegister: false,
      })
    );
  };
  const handleAddToCart = () => {
    dispatch(addToCart(course));
  };

  const content = (
    <div className="w-full p-8  rounded-lg ">
      {/* Price Section */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-3xl font-bold text-red-600">$49.00</span>
        <span className="text-gray-400 line-through">$76.00</span>
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
          35% OFF
        </span>
      </div>
      {/* Course Details */}
      <button
        className="w-full my-2 bg-blue-600 text-white font-semibold py-2 rounded-md flex items-center justify-center hover:bg-blue-700"
        onClick={() => {
          if (user) {
            handleAddToCart();
          } else {
            handleNotification(
              "Tính năng cần phải được đăng nhập mới thực hiện được",
              "warn"
            );
            openLogin();
          }
        }}
      >
        <FontAwesomeIcon icon={faBasketShopping} className="mx-3" />
        Add to cart
      </button>
      <button
        className="w-full my-2 bg-green-600 text-white font-semibold py-2 rounded-md flex items-center justify-center hover:bg-green-600/90"
        onClick={() => {
          if (user) {
            quanLyKhoaHocService
              .postDangkyKhoaHoc(user.accessToken, {
                maKhoaHoc: course.maKhoaHoc,
                taiKhoan: user.taiKhoan,
              })
              .then((res) => {
                handleNotification(res.data, "success");
                dispatch(getValueCourseAPI());
              })
              .catch((err) => {
                handleNotification(err.response.data, "error");
              });
          } else {
            handleNotification(
              "Tính năng cần phải được đăng nhập mới thực hiện được",
              "warn"
            );
            openLogin();
          }
        }}
      >
        Enroll
      </button>{" "}
    </div>
  );
  return (
    <div className=" rounded-lg overflow-hidden shadow-xl bg-white">
      <Popover content={content}>
        <div className="relative">
          <img
            className="w-full h-auto md:h-48"
            src={course.hinhAnh || "/png/course/hinhAnhCourse.png"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/public/png/course/hinhAnhCourse.png";
            }}
            alt="Course"
          />
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Featured
          </span>
        </div>
      </Popover>
      {/* Course Content */}
      <div className="p-5">
        {/* Course Level */}
        <span className="inline-block bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full">
          Beginner
        </span>

        {/* Course Title */}
        <h3 className="text-sm font-bold mt-2 mb-1 min-h-max sm:min-h-11">
          <Link to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}>
            {limitCharacter(course.tenKhoaHoc, 50)}
          </Link>
        </h3>

        {/* Course Instructor */}
        <p className="text-sm font-medium mb-2 min-h-max sm:min-h-10">
          Teacher: {limitCharacter(course.nguoiTao.hoTen, 37)}
        </p>

        {/* Course view */}
        <p className="text-lg font-bold text-green-500">
          {" "}
          Viewer: {course.luotXem}
        </p>
        <Link to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}>
          <button className="btn btn-primary w-full mt-2">
            Course details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
