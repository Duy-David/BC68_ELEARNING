import React from "react";
import { useLottie } from "lottie-react";
import animationLoading from "../../assets/animation/Animation-Loading.json";

const Loading = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { View: LottieView } = useLottie(options);

  return (
    <div className="fixed z-50 flex items-center justify-center w-full min-h-screen bg-white bg-opacity-80">
      {LottieView}
    </div>
  );
};

export default Loading;
