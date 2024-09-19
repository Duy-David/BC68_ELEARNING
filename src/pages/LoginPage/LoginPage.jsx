import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import InputCustom from "../../component/Input/InputCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { useFormik } from "formik";
import { authService } from "../../service/auth.service";
import { setLocalStorage } from "../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { setValueUser } from "../../redux/authSlice";
import { NotificationContext } from "../../App";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { notiValidate } from "../../common/notiValidate";

const LoginPage = ({ handleCancel, openRegister }) => {
  const dispatch = useDispatch();
  const { setStatusModal } = useSelector((store) => store.headerSlice);
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleReset,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: async (values) => {
      // console.log(values);
      try {
        // call api
        const result = await authService.signIn(values);
        // lưu local storage và redux store
        setLocalStorage("user", result.data);
        dispatch(setValueUser(result.data));
        // chuyển hướng người dùng
        handleNotification("Đăng nhập thành công", "success");
        handleCancel();
        setTimeout(() => {
          navigate(location.pathname);
        }, 1000);
      } catch (error) {
        console.log(error);
        handleNotification(
          `ERROR! :: ${error.message} :: ${error.response.data}`,
          "error"
        );
      }
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required(notiValidate.empty),
      matKhau: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^~`;,.()?&#])[A-Za-z\d@$!%*^~`;,.()?&#]{8,}$/,
          notiValidate.password
        ),
    }),
  });

  return (
    <>
      {/* <button onClick={showModal} className="btn hover:text-blue-600">
        Log In
      </button> */}

      <Modal
        wrapClassName="header_user_modal"
        title="Login"
        open={setStatusModal.isLogin}
        onOk={handleCancel}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: "true" }}
        okButtonProps={{ disabled: "true" }}
        footer={null}
        centered={true}
        destroyOnClose={true}
        afterClose={handleReset}
      >
        <p class="modal-description mb-6">
          Don't have an account yet?{" "}
          <button
            onClick={() => {
              handleCancel();
              openRegister();
            }}
          >
            Sign up for free
          </button>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 pb-5">
          <InputCustom
            contentLabel="Username"
            placeHolder="enter your account"
            name="taiKhoan"
            onChange={handleChange}
            value={values.taiKhoan}
            onBlur={handleBlur}
            errors={errors.taiKhoan}
            touched={touched.taiKhoan}
          />
          <InputCustom
            contentLabel="Password"
            placeHolder="enter your password"
            name="matKhau"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.matKhau}
            errors={errors.matKhau}
            touched={touched.matKhau}
          />
          <div className="flex justify-between">
            <div className="flex">
              <input
                className="cursor-pointer w-4  mr-2"
                type="checkbox"
                value=""
                id="rememberme"
              />
              <label className="cursor-pointer" for="rememberme">
                Remember me
              </label>
            </div>
            <div className="modal-description">
              <Link to={"/"}>Forgot your password?</Link>
            </div>
          </div>

          <button
            className="w-full bg-blue-500 text-white text-[16px] font-semibold px-5 py-4 rounded-lg hover:bg-yellow-500 hover:text-[#252525]"
            type="submit"
          >
            Log In
          </button>
          <p className="text-center text-[16px] line_deco">
            <span>or Log-in with</span>
          </p>
          <div className="flex justify-evenly ">
            <button
              type="button"
              className="font-bold text-lg flex items-center gap-3 border-2 px-7 py-3 rounded-md hover:border-[#252525]"
            >
              <FontAwesomeIcon
                icon={faSquareFacebook}
                className="h-5 text-blue-800"
              />
              Facebook
            </button>
            <button
              type="button"
              className="font-bold text-lg flex items-center gap-3 border-2 px-7 py-3 rounded-md hover:border-[#252525]"
            >
              <FontAwesomeIcon icon={faGoogle} className="h-5 text-red-600" />
              Google
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default LoginPage;
