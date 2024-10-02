import React from "react";
import Banner from "../../component/Banner/Banner";
import Categories from "../../component/Categories/Categories";
import Course from "../../component/Course/Course";
import AboutUs from "../../component/AboutUs/AboutUs";
import Instructor from "../../component/Instructor/Instructor";
import Partner from "../../component/Partner/Partner";
import WithLoading from "../../component/WithLoading/WithLoading";

const Homepage = () => {
  return (
    <>
      {/* <WithLoading> */}
        <Banner />
        <Categories />
        <Course />
        <AboutUs />
        <Instructor />
        <Partner />
      {/* </WithLoading> */}
    </>
  );
};

export default Homepage;
