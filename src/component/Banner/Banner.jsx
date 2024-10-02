import React from "react";
import "./banner.scss";
import FormSearchBar from "../FormSearchBar/FormSearchBar";
import IconBell from "../Icon/IconBell";

const Banner = () => {
  return (
    <section className="slider-section px-3 relative">
      <div className="container mx-auto pb-10" id="scene">
        <div className="banner_content flex items-center flex-wrap">
          <div className="banner_left w-full md:w-1/2">
            <div className="slider-content px-4">
              <p className="text-base font-bold uppercase text-[#0071dc] mb-3">
                Start to success
              </p>
              <h2 className="text-4xl leading-tight mb-6">
                Access To <mark>5500+</mark> Courses from <mark>480</mark>{" "}
                Instructors & Institutions
              </h2>
              <p className="text-xl mb-10">
                Take your learning organisation to the next level.
              </p>
              <div className="banner_search mb-8">
                <FormSearchBar />
              </div>
            </div>
          </div>

          <div className="banner_right w-full md:w-1/2">
            <div className="slider-image px-4">
              <div className="relative">
                <img src="assets/home-01-hero-image.png" alt="" />
                <div className="absolute -bottom-6 left-0 p-5 bg-white shadow-2xl rounded-lg max-w-[255px]">
                  <IconBell className="w-14 h-14 p-4 rounded-full bg-[#ffc221] absolute -top-8 -left-7 icon-white" />
                  <p>
                    Tomorrow is our{" "}
                    <strong className="font-medium">
                      "When I Grow Up" Spirit Day!
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          class="slider-section__shape-01"
          data-depth="0.8"
          src="assets/edumall-shape-grid-dots.png"
          alt="Shape"
          width="417"
          height="371"
        />
        <div class="slider-section__shape-02" data-depth="-1"></div>
        <div class="slider-section__shape-03" data-depth="1.6"></div>
        <img
          class="slider-section__shape-04"
          data-depth="-0.6"
          src="assets/edumall-shape-01.png"
          alt="Shape"
          width="179"
          height="178"
        />
      </div>
    </section>
  );
};

export default Banner;

// https://matthew.wagerfield.com/parallax/
// https://github.com/wagerfield/parallax
