import React, { useEffect, useState } from "react";
import "./header.scss";
import HeaderCategory from "../Categories/HeaderCategory";
import FormSearchBar from "../FormSearchBar/FormSearchBar";
import NavBarMenu from "./NavBarMenu";
import CartPopOver from "./CartPopOver";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Register from "../../pages/Register/Register";

const Header = () => {
  const [isFixedHeader, setIsFixedHeader] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixedHeader(true);
      } else {
        setIsFixedHeader(false);
      }
    };

    //theo dõi event scroll để chạy hàm handleScroll
    window.addEventListener("scroll", handleScroll);
    // Xóa sự kiện scroll trên unmount của useEffect
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
  };
  const closeLogin = () => {
    setIsLogin(false);
  };

  const openRegister = () => {
    setIsRegister(true);
    setIsLogin(false);
  };
  const closeRegiter = () => {
    setIsRegister(false);
  };

  return (
    <header
      className={`header_section px-3 z-50 ${
        isFixedHeader ? "sticky top-0" : ""
      }`}
    >
      <div className="container">
        <div className="header_wrapper flex items-center justify-center">
          <div className="header_logo mr-7">
            <a href="/">
              <img
                className="h-[32px] w-[148px]"
                src="./assets/svg/logo.svg"
                alt=""
              />
            </a>
          </div>

          <div className="header_category divider">
            <HeaderCategory />
          </div>

          <div className="header_inner flex items-center">
            <div className="header_search relative hidden sm:block">
              <FormSearchBar />
            </div>
            <nav className="header_navBar hidden lg:block">
              <NavBarMenu />
            </nav>
            <div className="header_cart ml-1 mr-3 lg:ml-5 lg:mr-7">
              <CartPopOver />
            </div>
            <div className="header_user divider hidden lg:block">
              <button onClick={openLogin} className="btn hover:text-blue-600">
                Log In
              </button>
              <button
                onClick={openRegister}
                className="btn text-blue-800 white bg-blue-600/25 hover:bg-blue-600 hover:text-white"
              >
                Sign Up
              </button>
              <LoginPage
                isModalOpen={isLogin} // Trạng thái mở/đóng modal
                handleCancel={closeLogin} // Hàm đóng modal
                openRegister={openRegister} // Chuyển sang Modal đăng ký
              />
              <Register
                isModalOpen={isRegister} // Trạng thái mở/đóng modal
                handleCancel={closeRegiter} // Hàm đóng modal
                openLogin={openLogin} // Chuyển sang Modal đăng nhập
              />
            </div>
            {/* Header mobile toggle */}
            <div className="header_toggle">
              <button className="toggleNav_btn">---</button>
              <button className="toggleSearch_btn">...</button>
            </div>
            <div className="">{/* <NavBarMenu /> */}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
