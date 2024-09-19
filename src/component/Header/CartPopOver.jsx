import React from "react";
import { Button, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CartPopOver = () => {
  const { user } = useSelector((state) => state.authSlice);

  const { cartItems, totalAmount } = useSelector((state) => state.cartSlice);
  console.log(cartItems);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));
  };


  const content = (
    <>
      <ul>
        {cartItems.map((course ,index) => (
          <li key={index} className="flex ">
            <div className="w-5 ">
              <img src={cartItems.hinhAnh} alt="" />
            </div>
            <div className="flex flex-col">
              <p className="font-normal ">{course.tenKhoaHoc}</p>
              <button
                className="bg-red-500 px-5 py-2 text-white rounded-lg"
                onClick={() => handleRemoveFromCart(course.maKhoaHoc)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="header_cart__footer border-t-2 pt-3 mt-5">
        <div className="py-2 flex justify-between font-bold">
          <p>Total:</p>
          <p>${totalAmount}</p>
        </div>
        <div className="py-2 flex justify-between gap-2">
          <a href="javscript:void(0)" className="btn btn-primary">
            View cart
          </a>
          <a href="javscript:void(0)" className="btn btn-primary">
            Checkout
          </a>
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
    >
      {user ? (
        <Link
          to={`/personal-infornation/${user.taiKhoan}`}
          className="header_cart_btn"
        >
          <FontAwesomeIcon icon={faBasketShopping} />
          <span>{cartItems.length}</span>
        </Link>
      ) : (
        <Link to={`/`} className="header_cart_btn">
          {" "}
          <FontAwesomeIcon icon={faBasketShopping} />
          <span>{cartItems.length}</span>
        </Link>
      )}
    </Popover>
  );
};
export default CartPopOver;
