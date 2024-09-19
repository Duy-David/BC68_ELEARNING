import React, { useState } from "react";
import { Button, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { pathChildren, pathDefault } from "../../common/path";
import { setStatusModal } from "../../redux/headerSlice";
const CartPopOver = () => {
  const { user } = useSelector((state) => state.authSlice);
  // const { setStatusModal } = useSelector((state) => state.headerSlice);
  const { cartItems, totalAmount } = useSelector((state) => state.cartSlice);
  console.log(cartItems);
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
      <div className="p-4">
        <ul className="grid grid-cols-4 gap-6">
          {cartItems.map((course, index) => {
            console.log(course);
            return (
              <Link to={`/course-catelogies/detail-course/${course.maKhoaHoc}`}>
                <li
                  key={index}
                  className="flex justify-between items-center shadow-md mb-4 border-b border-gray-200 pb-4"
                >
                  <div className="w-20 h-20">
                    <img
                      src={course.hinhAnh}
                      alt={course.tenKhoaHoc}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 px-4">
                    <p className="font-semibold text-lg">{course.tenKhoaHoc}</p>
                    <p className="text-sm text-gray-500">
                      {course.quantity} ×{" "}
                      <span className="font-semibold text-black">
                        ${course.giaTien.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    className="text-red-500 text-xl"
                    onClick={() => handleRemoveFromCart(course.maKhoaHoc)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="header_cart__footer border-t-2 pt-3 mt-5">
        <div className="py-2 flex justify-between font-bold">
          <p>Total:</p>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
        <div className="py-2 flex justify-between gap-2">
          {user ? (
            <>
              {" "}
             
              <Link
                to={`personal-infornation/${user.taiKhoan}`}
                className="btn btn-primary"
              >
                Checkout
              </Link>
            </>
          ) : (
            <>
              {" "}
              
              <button className="btn btn-primary"   onClick={openLogin}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    // <Popover placement="bottom" title={text} content={content} arrow={false}>
    <Popover
      rootClassName="header_cart_content"
      placement="bottom"
      title={false}
      content={content}
      arrow={false}
      trigger="click"
      visible={visible} 
      onVisibleChange={handleVisibleChange}
    >
      {user ? (
        <Link
        
          className="header_cart_btn"
        >
          <FontAwesomeIcon icon={faBasketShopping} />
          <span>{cartItems.length}</span>
        </Link>
      ) : (
        <button   className="header_cart_btn "   >
          {" "}
          <FontAwesomeIcon icon={faBasketShopping} />
          <span>{cartItems.length}</span>
        </button>
      )}
    </Popover>
  );
};
export default CartPopOver;
