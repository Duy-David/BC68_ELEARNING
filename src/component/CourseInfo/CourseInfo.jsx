import React, { useContext, useState } from "react";
import CheckIcon from "../Icon/CheckIcon";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { setStatusModal } from "../../redux/headerSlice";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";
import { useParams } from "react-router-dom";

const CourseInfo = ({ detailCourse }) => {
  const { maKhoaHoc } = useParams();
  const { handleNotification } = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = [
    { label: "Level", value: "Beginner" },
    { label: "Duration", value: "15.3 hours" },
    { label: "Lectures", value: "4 lectures" },
    { label: "Subject", value: "Data Modeling" },
    { label: "Language", value: "Vietnamese" },
  ];
  const openLogin = () => {
    dispatch(
      setStatusModal({
        isLogin: true,
        isRegister: false,
      })
    );
  };
  const handleAddToCart = () => {
    dispatch(addToCart(detailCourse));
  };
  const materials = ["Videos", "Booklets"];

  return (
    <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Price Section */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-3xl font-bold text-red-600">$49.00</span>
        <span className="text-gray-400 line-through">$76.00</span>
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
          35% OFF
        </span>
      </div>
      {/* Course Details */}
      <div className="space-y-4 mb-6">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-500">{detail.label}</span>
            <span className="font-semibold text-gray-900">{detail.value}</span>
          </div>
        ))}
      </div>
      {/* Material Includes */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          Material Includes
        </h4>
        <ul className="space-y-2">
          {materials.map((material, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <CheckIcon color="text-blue-500" />
              {material}
            </li>
          ))}
        </ul>
      </div>
      {/* Add to Cart Button */}
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
                maKhoaHoc,
                taiKhoan: user.taiKhoan,
              })
              .then((res) => {
                console.log(res)
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
};

export default CourseInfo;
