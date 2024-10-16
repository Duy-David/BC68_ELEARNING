import React from "react";
import Lottie from "lottie-react";
import AniUnderConstruction from "../../assets/animation/Animation-UnderConstruction.json";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";

const UnderConstructionPage = () => {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div>&nbsp;</div>
      <div className="flex flex-col justify-center col-span-3 h-[80vh]">
        {/* animation  */}
        <Lottie animationData={AniUnderConstruction} loop={true} />
        <div className="flex items-center justify-between">
          <h3 className="text-[#E89F69] text-lg">
            THIS PAGE IS UNDER CONSTRUCTION. PLEASE COME BACK LATER
          </h3>
          <Link to={pathDefault.homePage}>
            <button className="bg-blue-500 hover:bg-blue-500/70 text-white py-2 px-4 rounded-md text-center">
              Back to HomePage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
