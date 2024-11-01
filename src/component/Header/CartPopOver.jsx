import React, { useState } from "react";
import { Button, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { pathChildren, pathDefault } from "../../common/path";
import { setStatusModal } from "../../redux/headerSlice";
import IconCartEmpty from "../Icon/IconCartEmpty";

const CartPopOver = () => {
  const { user } = useSelector((state) => state.authSlice);
  // const { setStatusModal } = useSelector((state) => state.headerSlice);
  const { cartItems, totalAmount } = useSelector((state) => state.cartSlice);
  const totalAmountStorage = Number(localStorage.getItem("totalAmount"));

  const dispatch = useDispatch();
  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));
  };
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const openLogin = () => {
    dispatch(
      setStatusModal({
        isLogin: true,
        isRegister: false,
      }),
      setVisible(false)
    );
  };
  const content = (
    <>
      <ul className="header_cart__list overflow-y-auto max-h-[70vh] flex flex-col">
        {cartItems.map((course, index) => {
          return (
            <Link
              key={index}
              to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}
            >
              <li className="header_cart__item space-x-2">
                <button
                  onClick={() => handleRemoveFromCart(course.maKhoaHoc)}
                  className="header_cart__close "
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="header_cart__thumbnail">
                  <img
                    src={course?.hinhAnh || "/png/course/hinhAnhCourse.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/png/course/hinhAnhCourse.png";
                    }}
                    alt={course.tenKhoaHoc}
                    width={80}
                    height={93}
                  />
                </div>
                <div className="header_cart__caption">
                  <h3 className="header_cart__name">
                    <p>{course.tenKhoaHoc}</p>
                  </h3>
                  <span className="header_cart__quantity">
                    {course.quantity} ×{" "}
                    <strong className="amount">${course.giaTien}</strong>
                    <span className="separator">.00</span>
                  </span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="header_cart__footer border-t-2 pt-3 mt-5">
        <div className="py-2 flex justify-between font-bold">
          <p>Total:</p>
          <p>${totalAmountStorage?.toFixed(2)}</p>
        </div>
        <div className="py-2 flex justify-between gap-2">
          {user ? (
            <>
              {" "}
              <Link
                to={`/personal-infornation/${user.taiKhoan}?tab=3`}
                className="btn btn-primary"
              >
                Checkout
              </Link>
            </>
          ) : (
            <>
              {" "}
              <button className="btn btn-primary" onClick={openLogin}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <Popover
      rootClassName="header_cart_content"
      placement="bottom"
      title={false}
      content={
        cartItems.length === 0 ? (
          <>
            <IconCartEmpty className="w-16 mx-auto mt-10 mb-2" />
            <p className="mx-12 pb-8">Chưa có khóa học</p>
          </>
        ) : (
          content
        )
      }
      arrow={false}
      trigger="click"
      open={visible}
      onOpenChange={handleVisibleChange}
    >
      <button className="header_cart_btn ">
        {" "}
        <FontAwesomeIcon
          icon={faBasketShopping}
          className="hover:text-blue-500"
        />
        {cartItems.length !== 0 && <span>{cartItems.length}</span>}
      </button>
    </Popover>
  );
};
export default CartPopOver;
