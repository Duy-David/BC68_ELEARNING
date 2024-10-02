import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./user-template.scss";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUpOutlined } from "@ant-design/icons";
import WithLoading from "../../component/WithLoading/WithLoading";

const Usertemplate = () => {
  // const { isLoading } = useSelector((state) => state.loadingSlice.isLoading);
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
