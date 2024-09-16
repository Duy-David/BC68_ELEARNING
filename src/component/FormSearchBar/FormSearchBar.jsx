import React from "react";
import InputCustom from "../Input/InputCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FormSearchBar = () => {
  return (
    <form className="flex items-center ">
      <InputCustom placeHolder={"Search..."} classWrapper="inputWrapper" />
      <button type="submit" className="serach_btn">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default FormSearchBar;
