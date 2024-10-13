import React, { useEffect, useState } from "react";
import "./header.scss";
import HeaderCategory from "../HeaderCategory/HeaderCategory";
import FormSearchBar from "../FormSearchBar/FormSearchBar";
import NavBarMenu from "./NavBarMenu";
import CartPopOver from "./CartPopOver";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Register from "../../pages/Register/Register";
import NavBarMobile from "./NavBarMobile";
import IconLogo from "./IconLogo";
import { useDispatch, useSelector } from "react-redux";
import { setStatusModal } from "../../redux/headerSlice";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import LoggedInUserInfo from "./LoggedInUserInfo";

const Header = () => {
  const { user } = useSelector((state) => state.authSlice);
  const isLoggedIn = !!user;

  const dispatch = useDispatch();
  const [isFixedHeader, setIsFixedHeader] = useState(false);

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

  // Đưa trạng thái Modal User lên redux
  const openLogin = () => {
    dispatch(
      setStatusModal({
        isLogin: true,
        isRegister: false,
      })
    );
  };
  const closeLogin = () => {
    dispatch(
      setStatusModal({
        isLogin: false,
      })
    );
  };
  const openRegister = () => {
    dispatch(
      setStatusModal({
        isLogin: false,
        isRegister: true,
      })
    );
  };
  const closeRegister = () => {
    dispatch(
      setStatusModal({
        isRegister: false,
      })
    );
  };

  return (
    <header
      className={`header_section px-3 z-50 ${
        isFixedHeader ? "sticky top-0" : ""
      }`}
    >
      <div className="container">
        <div className="header_wrapper flex items-center justify-center md:justify-between">
          <div className="header_logo mr-7">
            <Link to={pathDefault.homePage}>
              <IconLogo />
            </Link>
          </div>

          <div className="header_category divider">
            <HeaderCategory />
          </div>

          <div className="header_inner flex items-center">
            <div className="header_search relative hidden sm:block min-w-fit max-w-[400px] sm:min-w-0 lg:max-w-[270px] xl:max-w-[640px] xl:min-w-[330px] 2xl:min-w-[580px]">
              <FormSearchBar />
            </div>
            <nav className="header_navBar hidden lg:block">
              <NavBarMenu />
            </nav>
            <div className="header_cart ml-1 mr-3 lg:mr-6">
              <CartPopOver />
            </div>
            {/* check đăng nhập */}
            {isLoggedIn ? (
              <LoggedInUserInfo />
            ) : (
              <>
                <div className="header_user hidden lg:block">
                  <button
                    onClick={openLogin}
                    className="btn hover:text-blue-600"
                  >
                    Log In
                  </button>
                  <button
                    onClick={openRegister}
                    className="btn text-blue-800 white bg-blue-600/25 hover:bg-blue-600 hover:text-white"
                  >
                    Sign Up
                  </button>
                  <LoginPage
                    handleCancel={closeLogin} // Hàm đóng modal
                    openRegister={openRegister} // Chuyển sang Modal đăng ký
                  />
                  <Register
                    handleCancel={closeRegister} // Hàm đóng modal
                    openLogin={openLogin} // Chuyển sang Modal đăng nhập
                  />
                </div>
              </>
            )}
            {/* Header mobile toggle */}
            <div className="header_toggle block lg:hidden">
              <NavBarMobile />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
