import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./user-template.scss";

const Usertemplate = () => {
  return (
    <div className=" mx-auto">
      <Header />
      <main className="">
        {/*  */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Usertemplate;
