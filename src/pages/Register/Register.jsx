import React, { useState } from "react";
import { Button, Modal } from "antd";
import InputCustom from "../../component/Input/InputCustom";

const Register = ({ isModalOpen, handleCancel, openLogin }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <>
      {/* <button
        onClick={showModal}
        className="btn text-blue-800 white bg-blue-600/25 hover:bg-blue-600 hover:text-white"
      >
        Sign Up
      </button> */}
      <Modal
        width="670px"
        wrapClassName="header_user_modal"
        title="Sign Up"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        // destroyOnClose
      >
        <p class="modal-description mb-6">
          Already have an account?{" "}
          <button
            onClick={() => {
              handleCancel();
              openLogin();
            }}
          >
            Log in
          </button>
        </p>

        <form className="grid grid-cols-2 gap-x-5 gap-y-6 pb-5">
          <InputCustom
            contentLabel="Username"
            placeHolder="enter your account"
            name="taiKhoan"
          />
          <InputCustom
            contentLabel="Email"
            placeHolder="enter your email"
            name="email"
          />
          <InputCustom
            contentLabel="Password"
            placeHolder="enter your password"
            name="matKhau"
            type="password"
          />
          <InputCustom
            contentLabel="Re-Enter Password"
            placeHolder="re-enter password"
            name="matKhauCheck"
            type="password"
          />
          <InputCustom
            contentLabel="Your Name"
            placeHolder="enter your name"
            name="hoTen"
          />
          <InputCustom
            contentLabel="Your Phone"
            placeHolder="enter your phone number"
            name="soDT"
          />
          <div className="flex col-span-2">
            <input
              className="cursor-pointer w-4 mr-2"
              type="checkbox"
              value=""
              id="agree_privacy"
            />
            <label className="cursor-pointer" for="agree_privacy">
              Accept the{" "}
              <span className="modal-description">
                <a href="javascript:void(0)">Terms and Privacy Policy</a>
              </span>
            </label>
          </div>
          <button
            className="w-full bg-blue-500 text-white text-[16px] font-semibold px-5 py-4 rounded-lg hover:bg-yellow-500 hover:text-[#252525] col-span-2"
            type="submit"
          >
            Log In
          </button>
        </form>
      </Modal>
    </>
  );
};
export default Register;
