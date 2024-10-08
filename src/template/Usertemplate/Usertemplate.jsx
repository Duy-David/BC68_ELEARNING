import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./user-template.scss";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUpOutlined } from "@ant-design/icons";
import WithLoading from "../../component/WithLoading/WithLoading";
import { useSelector } from "react-redux";
import { removeItemLocalStorage } from "../../util/util";

const Usertemplate = () => {
  // fix show welcome robot
  const { user } = useSelector((state) => state.authSlice);
  if (user) {
    location.pathname != `/personal-infornation/${user.taiKhoan}` &&
      removeItemLocalStorage("robotLoaded");
  }

  return (
    <div className="mx-auto">
      <Header />

      <WithLoading>
        <main>
          {/*  */}
          <Outlet />
        </main>
        <ScrollToTop
          smooth
          top={150}
          className="customize"
          component={<ArrowUpOutlined className="text-xl" />}
        />
      </WithLoading>

      <Footer />
    </div>
  );
};

export default Usertemplate;
