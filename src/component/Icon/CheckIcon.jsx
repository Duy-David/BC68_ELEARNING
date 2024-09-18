import React from "react";
const CheckIcon = ({ color = "text-green-500" }) => (
  <svg
    className={`w-6 h-6 ${color} mx-3`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
export default CheckIcon;
