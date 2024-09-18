import React from "react";
import { Button, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faXmark } from "@fortawesome/free-solid-svg-icons";

const text = <span>Title</span>;
const content = (
  <>
    <ul className="header_cart__list overflow-y-auto max-h-[70vh]">
      <li className="header_cart__item">
        <a href="javscript:void(0)" className="header_cart__close">
          <FontAwesomeIcon icon={faXmark} />
        </a>
        <div className="header_cart__thumbnail">
          <a href="#">
            <img
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/zxczcbbbb_gp01.png"
              alt="Product"
              width={80}
              height={93}
            />
          </a>
        </div>
        <div className="header_cart__caption">
          <h3 className="header_cart__name">
            <a href="javscript:void(0)">Lập trình React Native</a>
          </h3>
          <span className="header_cart__quantity">
            1 × <strong className="amount">$49</strong>
            <span className="separator">.00</span>
          </span>
        </div>
      </li>
      <li className="header_cart__item">
        <a href="javscript:void(0)" className="header_cart__close">
          <FontAwesomeIcon icon={faXmark} />
        </a>
        <div className="header_cart__thumbnail">
          <a href="#">
            <img
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/lap-trinh-python.jpg"
              alt="Product"
              width={80}
              height={93}
            />
          </a>
        </div>
        <div className="header_cart__caption">
          <h3 className="header_cart__name">
            <a href="javscript:void(0)">Lập trình Python</a>
          </h3>
          <span className="header_cart__quantity">
            1 × <strong className="amount">$49</strong>
            <span className="separator">.00</span>
          </span>
        </div>
      </li>
      <li className="header_cart__item">
        <a href="javscript:void(0)" className="header_cart__close">
          <FontAwesomeIcon icon={faXmark} />
        </a>
        <div className="header_cart__thumbnail">
          <a href="#">
            <img
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/front-end-can-ban-3_gp01.jpg"
              alt="Product"
              width={80}
              height={93}
            />
          </a>
        </div>
        <div className="header_cart__caption">
          <h3 className="header_cart__name">
            <a href="javscript:void(0)">Lập trình Front End căn bản</a>
          </h3>
          <span className="header_cart__quantity">
            1 × <strong className="amount">$49</strong>
            <span className="separator">.00</span>
          </span>
        </div>
      </li>
    </ul>

    <div className="header_cart__footer border-t-2 pt-3 mt-5">
      <div className="py-2 flex justify-between font-bold">
        <p>Total:</p>
        <p>
          $445<span className="separator">.99</span>
        </p>
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
const CartPopOver = () => {
  return (
    // <Popover placement="bottom" title={text} content={content} arrow={false}>
    <Popover
      rootClassName="header_cart_content"
      placement="bottom"
      title={false}
      content={content}
      arrow={false}
      trigger="click"
    >
      <a href="javascript:void(0)" className="header_cart_btn">
        <FontAwesomeIcon icon={faBasketShopping} />
        <span>3</span>
      </a>
    </Popover>
  );
};
export default CartPopOver;
