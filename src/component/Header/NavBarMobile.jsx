import React, { useState } from "react";
import { Button, Popover, Space } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import FormSearchBar from "../FormSearchBar/FormSearchBar";
import NavBarMenu from "./NavBarMenu";
import IconLogo from "./IconLogo";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Register from "../../pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { setStatusModal } from "../../redux/headerSlice";

const NavBarMobile = () => {
  const getUserRedux = useSelector((store) => store.authSlice);
  const isLoggedIn = !!getUserRedux.user;
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);
  const hideNav = () => {
    setOpenNav(false);
  };
  const handleOpenNavChange = (newOpen) => {
    setOpenNav(newOpen);
  };

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

  const content = (
    <Space direction="vertical" size="large" className="w-[50vw] min-w-[250px]">
      <Space direction="vertical" size="large">
        <div className="h-auto bg-[#0071dc] px-3 py-2 flex justify-between items-center absolute top-0 left-0 w-full">
          <IconLogo />
          <CloseOutlined
            onClick={hideNav}
            className="cursor-pointer p-1 h-[24px] w-[24px] rounded text-[16px] text-[#0071dc] bg-white opacity-60 hover:opacity-100 duration-300"
          />
        </div>
        <div className="header_search block sm:hidden">
          <FormSearchBar />
        </div>
        <div className="">
          <NavBarMenu openNav={openNav} />
        </div>
      </Space>
      {isLoggedIn ? null : (
        <>
          <Space className="flex justify-center bg-[#ccc] p-3 absolute bottom-0 left-0 w-full">
            <button onClick={openLogin} className="btn btn-primary">
              Log In
            </button>
            <button onClick={openRegister} className="btn btn-primary">
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
          </Space>
        </>
      )}
    </Space>
  );

  return (
    <>
      <Popover
        rootClassName="headerNavMenu_mobile"
        placement="bottom"
        title={false}
        content={content}
        arrow={false}
        trigger="click"
        open={openNav}
        onOpenChange={handleOpenNavChange}
      >
        <button className="toggleNav_btn text-2xl px-4">
          {openNav ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </Popover>
      <div
        className={`headerNavMenu_mobile_overlay ${
          openNav ? "opacity-80 z-50" : "opacity-0 -z-50"
        }`}
      ></div>
    </>
  );
};
export default NavBarMobile;
