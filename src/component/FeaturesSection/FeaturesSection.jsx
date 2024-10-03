import React from "react";
import "./../Icon/icon_style.scss";
import IconEssentialSkills from "../Icon/features/IconEssentialSkills";
import IconCertificates from "../Icon/features/IconCertificates";
import IconCareer from "../Icon/features/IconCareer";
import IconMaster from "../Icon/features/IconMaster";

const FeaturesSection = () => {
  return (
    <section className="px-3 py-7 bg-[#0071dc] text-white text-[16px] font-bold">
      <div className="container mx-auto">
        <div className="flex items-center gap-y-6 flex-wrap">
          <div className="features-item w-full sm:w-1/2 lg:w-1/4">
            <div className="px-3 flex items-center gap-x-5">
              <IconEssentialSkills className="features-item_icon" />
              <p className="features-item_content">
                Learn The <br />
                Essential Skills
              </p>
            </div>
          </div>

          <div className="features-item w-full sm:w-1/2 lg:w-1/4">
            <div className="px-3 flex items-center gap-x-5">
              <IconCertificates className="features-item_icon" />
              <p className="features-item_content">
                Earn Certificates <br />
                And Degrees
              </p>
            </div>
          </div>

          <div className="features-item w-full sm:w-1/2 lg:w-1/4">
            <div className="px-3 flex items-center gap-x-5">
              <IconCareer className="features-item_icon" />
              <p className="features-item_content">
                Get Ready for The <br />
                Next Career
              </p>
            </div>
          </div>

          <div className="features-item w-full sm:w-1/2 lg:w-1/4">
            <div className="px-3 flex items-center gap-x-5">
              <IconMaster className="features-item_icon" />
              <p className="features-item_content">
                Master at Different <br />
                Areas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
