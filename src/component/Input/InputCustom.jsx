import React from "react";

const InputCustom = ({
  contentLabel,
  placeHolder,
  name,
  value,
  onChange,
  type = "text",
  classWrapper = "",
  onBlur,
  errors,
  touched,
  disabled
}) => {
  return (
    <div className={classWrapper}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {contentLabel}
      </label>
      <input
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors && touched ? "border-red-500":"border-blue-500"}`}
        placeholder={placeHolder}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        disabled={disabled}
      />
      {/* Viết toán tử diue962 kiện nếu error với touched được truyền vào thì mới hiện thẻ p dùng báo lỗi */}
      {errors && touched && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default InputCustom;
