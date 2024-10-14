import { message } from "antd";
import React from "react";
import ImgInDevelopment from "./ImgInDevelopment";
import { Link } from "react-router-dom";

const FeatureInDev = ({
  typeLabel = "text",
  className,
  contentLabel = "Click me",
  linkTo,
}) => {
  // typeLabel = "text" | typeLabel = "button" | typeLabel = "link"
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.open({
      type: "warning",
      content: (
        <span className="text-gray-400 text-lg">
          <strong className="text-[#ff4600] text-2xl">SORRY!</strong>
          <br />
          This feature is under development
        </span>
      ),
      duration: 3,
      icon: <ImgInDevelopment />,
      className: "featureInDev",
    });
  };
  return (
    <>
      {contextHolder}
      {typeLabel === "button" ? (
        <button className={`${true && className}`} type="button" onClick={info}>
          {contentLabel}
        </button>
      ) : typeLabel === "link" ? (
        <Link
          to={true && linkTo}
          className={`${true && className}`}
          onClick={info}
        >
          {contentLabel}
        </Link>
      ) : (
        <span className={`${true && className}`} onClick={info}>
          {contentLabel}
        </span>
      )}
    </>
  );
};

export default FeatureInDev;
