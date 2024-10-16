import React from "react";
import "./aboutUs.scss";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import icon from "/svg/AboutUS/carousel.svg";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const AboutUs = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const testimonials = [
    {
      title: "Great quality!",
      text: "I wanted to place a review since their support helped me within a day or so, which is nice! Thanks and 5 stars!",
      name: "Oliver Beddows",
      position: "Designer, Manchester",
      image: "./png/avatar-01.png", // Thay ảnh phù hợp nếu có
    },
    {
      title: "Code Quality",
      text: "I wanted to place a review since their support helped me within a day or so, which is nice! Thanks and 5 stars!",
      name: "Madley Pondor",
      position: "Reporter, San Diego",
      image: "./png/avatar-02.png", // Thay ảnh phù hợp nếu có
    },
    {
      title: "Customer Support",
      text: "Very good and fast support during the week. They know what you need, exactly when you need it.",
      name: "Mina Hollace",
      position: "Reporter, London",
      image: "./png/avatar-03.png", // Thay ảnh phù hợp nếu có
    },
    {
      title: "Great quality!",
      text: "I wanted to place a review since their support helped me within a day or so, which is nice! Thanks and 5 stars!",
      name: "Luvic Dubble",
      position: "Designer, Manchester",
      image: "/png/avatar-04.png", // Thay ảnh phù hợp nếu có
    },
    {
      title: "Great quality!",
      text: "I wanted to place a review since their support helped me within a day or so, which is nice! Thanks and 5 stars!",
      name: "Oliver Beddows",
      position: "Designer, Manchester",
      image: "/png/avatar-01.png", // Thay ảnh phù hợp nếu có
    },
    {
      title: "Code Quality",
      text: "I wanted to place a review since their support helped me within a day or so, which is nice! Thanks and 5 stars!",
      name: "Madley Pondor",
      position: "Reporter, San Diego",
      image: "/png/avatar-02.png", // Thay ảnh phù hợp nếu có
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <section className=" container py-12 mx-auto px-3">
        <div className=" grid grid-cols-4 ">
          <div className="text-left mb-8 md:col-span-1 col-span-4">
            <h2 className="text-3xl font-semibold relative text-gray-900 about-title">
              People Say <br /> About <mark className="">EduMall</mark>
            </h2>
            <p className="mt-8 text-base text-gray-600 ">
              One-stop solution for any eLearning center, online courses. People
              love EduMall because they can create their sites with ease here.
            </p>
            <button
              className="btn-aboutUS px-6 py-3 rounded-lg transition duration-300 mt-5"
              onClick={() => {
                navigate(pathDefault.underConstruction)
              }}
            >
              View all
            </button>
          </div>

          <div className="md:col-span-3 col-span-4 ">
            <Slider mx-5 {...settings}>
              {testimonials.map((testimonial, index) => {
                return (
                  <div
                    key={index}
                    className=" about-item p-7  rounded-lg max-w-96"
                    // style={{ backgroundColor: '#f8f8f8', }}
                  >
                    <div className="flex justify-between">
                      {" "}
                      <h3 className="text-lg font-bold text-blue-600">
                        {testimonial.title}
                      </h3>
                      <img
                        src={icon}
                        alt="Carousel Icon"
                        className="testimonial-img"
                      />
                    </div>

                    <p className="mt-4 text-gray-600">{testimonial.text}</p>
                    <div className="mt-6 flex items-center">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div className="ml-4">
                        <p className="text-gray-900 font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
