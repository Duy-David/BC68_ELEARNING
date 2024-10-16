import React from "react";
import Lottie from "lottie-react";
import AnimationFoundNot from "../../assets/animation/AnimationFoundNot.json";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5 h-screen bg-black">
      <div></div>
      <div className="flex flex-col justify-center col-span-3 ">
        {/* animation  */}
        <Lottie animationData={AnimationFoundNot} loop={true} />
        {/* button */}
        <button
          onClick={() => {
            navigate(pathDefault.homePage);
          }}
          className="bg-blue-500 mx-auto hover:bg-blue-500/70 text-white py-2 px-4 rounded-md text-center"
        >
          Back to HomePage
        </button>
      </div>
    </div>
  );
};

export default NotFound404;
