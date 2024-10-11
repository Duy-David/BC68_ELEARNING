import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const InputCustormMin = ({
  placeHolder,
  name,
  value,
  onChange,
  type = "text",
  onBlur,
  onFocus,
  errors,
  touched,
  disabled,
  className,

  classWrapper = "",
  contentLabel,
  classLabel,
  enableShowPassBtn = false, //defined to allow showPass
}) => {
  const [typeChange, setTypeChange] = useState("password");
  const [icon, setIcon] = useState(<EyeOutlined />);

  const handleToggShow = () => {
    if (typeChange === "password") {
      setIcon(<EyeInvisibleOutlined />);
      setTypeChange("text");
    } else {
      setIcon(<EyeOutlined />);
      setTypeChange("password");
    }
  };
  return (
    <div className={`relative${classWrapper ? " " + classWrapper : ""}`}>
      <label className={classLabel ? classLabel : ""}>{contentLabel}</label>
      <input
        type={enableShowPassBtn === true ? typeChange : type}
        className={`${className ? className + " " : ""}${
          errors && touched ? "border-red-500" : "border-blue-500"
        }`}
        placeholder={placeHolder}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        disabled={disabled}
        onFocus={onFocus}
        enableShowPassBtn={enableShowPassBtn}
      />
      {/* show if password input */}
      {enableShowPassBtn === true && (
        <span
          onClick={handleToggShow}
          className="px-2 w-fit cursor-pointer text-lg absolute top-10 right-2 rounded text-[#999]"
        >
          {icon}
        </span>
      )}
      {/* Viết toán tử điều kiện nếu error với touched được truyền vào thì mới hiện thẻ p dùng báo lỗi */}
      {errors && touched && (
        <p className="text-red-500 block text-sm">{errors}</p>
      )}
    </div>
  );
};

export default InputCustormMin;
