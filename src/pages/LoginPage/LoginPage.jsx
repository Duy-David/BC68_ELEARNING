import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
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
import FeatureInDev from "../NotFound404/FeatureInDev";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { FacebookProvider, LoginButton } from "react-facebook";
const LoginPage = ({ handleCancel, openRegister }) => {
  const dispatch = useDispatch();
  const { setStatusModal } = useSelector((store) => store.headerSlice);
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [failedAttempts, setFailedAttempts] = useState(0);
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
      try {
        const result = await authService.signIn(values);
        setLocalStorage("user", result.data);
        dispatch(setValueUser(result.data));
        handleNotification("Đăng nhập thành công", "success");
        handleCancel();
        setTimeout(() => {
          navigate(location.pathname);
        }, 1000);
      } catch (error) {
        setFailedAttempts((prev) => prev + 1);
        handleNotification(`${error.response.data}`, "error");
        if (failedAttempts + 1 >= 5) {
          handleNotification(
            "Đăng nhập sai quá 5 lần, chuyển hướng đến Google",
            "error"
          );
          setTimeout(() => {
            window.location.href = "https://www.google.com";
          }, 1000);
        }
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
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    if (token) {
      const { name } = jwtDecode(token);
      const userInfo = name.replace(/\s+/g, "");
      console.log(userInfo);

      const userData = {
        taiKhoan: userInfo,
        matKhau: "",
      };

      setLocalStorage("user", userData);
      dispatch(setValueUser(userData));
      handleNotification("Đăng nhập thành công", "success");
      handleCancel();
      setTimeout(() => {
        navigate(location.pathname);
      }, 1000);
    } else {
      handleNotification("Đã xảy ra lỗi trong quá trình đăng nhập", "error");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    handleNotification("Đã xảy ra lỗi trong quá trình đăng nhập", "error");
  };

  const [isFbSdkLoaded, setIsFbSdkLoaded] = useState(false);

  useEffect(() => {
    if (window.FB) {
      setIsFbSdkLoaded(true);
    } else {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "586249857242389",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v12.0",
        });
        setIsFbSdkLoaded(true);
      };

      // Tải SDK
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  const responseFacebook = (data) => {
    console.log(data);
    if (data && data.profile) {
      const userInfo = data.profile.name.replace(/\s+/g, "");
      console.log(userInfo);
      const userData = {
        taiKhoan: userInfo,
        matKhau: "", // Optional
      };

      // Save to local storage and redux store
      setLocalStorage("user", userData);
      dispatch(setValueUser(userData));
      handleNotification("Đăng nhập thành công", "success");
      handleCancel();
      setTimeout(() => {
        navigate(location.pathname);
      }, 1000);
    } else {
      handleNotification("Đã xảy ra lỗi trong quá trình đăng nhập", "error");
    }
  };

  const handleErrorFacebook = (error) => {
    console.error(error);
    handleNotification("Đã xảy ra lỗi trong quá trình đăng nhập", "error");
  };
  return (
    <>
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
            // value={values.matKhau}
            errors={errors.matKhau}
            touched={touched.matKhau}
            enableShowPassBtn={true}
          />
          <div className="flex justify-between">
            <div className="flex">
              <input
                className="cursor-pointer w-4  mr-2"
                type="checkbox"
                value=""
                id="rememberme"
              />
              <label classname="cursor-pointer" htmlFor="rememberme">
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
          <div className="flex justify-evenly font-medium ">
            {/* <FeatureInDev
                typeLabel="button"
                className="font-bold text-lg flex items-center gap-3 border-2 px-7 py-3 rounded-md hover:border-[#252525]"
                contentLabel={
                  <>
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      className="h-5 text-blue-800"
                    />
                    Facebook
                  </>
                }
              /> */}
            {/* <FeatureInDev
              typeLabel="button"
              className="font-bold text-lg flex items-center gap-3 border-2 px-7 py-3 rounded-md hover:border-[#252525]"
              contentLabel={
                <>
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className="h-5 text-red-600"
                  />
                  Google
                </>
              }
            /> */}
            {isFbSdkLoaded && (
              <FacebookProvider appId="586249857242389">
                <LoginButton
                  // scope="email"
                  onCompleted={responseFacebook}
                  onError={handleErrorFacebook}
                >
                  <div class="custom-google-login-button font-[500] text-md flex items-center px-[12px] py-[7px] gap-2 border-[2px] rounded-md hover:border-[#d2e3fc]">
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      className="h-5 text-blue-800"
                    />
                    Sign in with Facebook
                  </div>
                </LoginButton>
              </FacebookProvider>
            )}

            <GoogleOAuthProvider clientId="153095424782-ghdei8uml5ak6ulosu7oej9t36bhpccl.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                scope="profile email"
              ></GoogleLogin>
            </GoogleOAuthProvider>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default LoginPage;
