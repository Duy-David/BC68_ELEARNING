import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./user-template.scss";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUpOutlined } from "@ant-design/icons";

const Usertemplate = () => {
  return (
    <div className="mx-auto">
      <Header />
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
      <Footer />
    </div>
  );
};

export default Usertemplate;
