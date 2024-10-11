import React, { useEffect, useState } from "react";
import Banner from "../../component/Banner/Banner";
import Categories from "../../component/Categories/Categories";
import Course from "../../component/Course/Course";
import AboutUs from "../../component/AboutUs/AboutUs";
import Instructor from "../../component/Instructor/Instructor";
import Partner from "../../component/Partner/Partner";
import FeaturesSection from "../../component/FeaturesSection/FeaturesSection";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    categories: false,
    course: false,
    aboutUs: false,
    instructor: false,
    partner: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;

      setIsVisible({
        features: scrollPosition > 300,
        categories: scrollPosition > 500,
        course: scrollPosition > 700,
        aboutUs: scrollPosition > 1400,
        instructor: scrollPosition > 1900,
        partner: scrollPosition > 2100,
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <Banner />
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isVisible.features ? "opacity-100" : "opacity-0"
        }`}
      >
        <FeaturesSection />
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isVisible.categories ? "opacity-100" : "opacity-0"
        }`}
      >
        <Categories />
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isVisible.course ? "opacity-100" : "opacity-0"
        }`}
      >
        <Course />
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isVisible.aboutUs ? "opacity-100" : "opacity-0"
        }`}
      >
        <AboutUs />
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isVisible.instructor ? "opacity-100" : "opacity-0"
        }`}
      >
        <Instructor />
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isVisible.partner ? "opacity-100" : "opacity-0"
        }`}
      >
        <Partner />
      </div>
    </>
  );
};

export default Homepage;
