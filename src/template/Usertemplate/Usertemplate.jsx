import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./user-template.scss";

const Usertemplate = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="px-3 sm:px-5">
        {/*  */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Usertemplate;
