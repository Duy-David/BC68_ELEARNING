import React, { useContext } from "react";
import { Modal } from "antd";
import InputCustom from "../../component/Input/InputCustom";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { NotificationContext } from "../../App";
import { authService } from "../../service/auth.service";
import { pathDefault } from "../../common/path";
import { notiValidate } from "../../common/notiValidate";

const Register = ({ handleCancel, openLogin }) => {
  const { setStatusModal } = useSelector((store) => store.headerSlice);
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);

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
      email: "",
      matKhau: "",
      matKhauCheck: "",
      hoTen: "",
      soDT: "",
      term: false,
    },

    onSubmit: (values) => {
      console.log("val1", values);
      authService
        .signUp({
          ...values,
          maNhom: "GP01",
        })
        .then((res) => {
          console.log(res);
          handleNotification(
            "Đăng ký thành công! Bạn sẽ chuyển về Home page",
            "success"
          );
          handleCancel();
          handleReset();

          setTimeout(() => {
            navigate(pathDefault.homePage);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          handleNotification(
            `ERROR! ${err.message && ":: " + err.message} ${
              err.response.data && ":: " + err.response.data
            }`,
            "error"
          );
        });
    },

    // validate
    validationSchema: yup.object({
      taiKhoan: yup
        .string()
        .required(notiValidate.empty)
        .min(3, notiValidate.min(3))
        .max(10, notiValidate.max(10)),
      email: yup
        .string()
        .required(notiValidate.empty)
        .email(notiValidate.email),
      matKhau: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^~`;,.()?&#])[A-Za-z\d@$!%*^~`;,.()?&#]{8,}$/,
          notiValidate.password
        ),
      matKhauCheck: yup
        .string()
        .required(notiValidate.empty)
        .oneOf([yup.ref("matKhau")], notiValidate.re_password),
      // .matches(yup.ref("matKhau"), notiValidate.re_password),
      hoTen: yup
        .string()
        .required(notiValidate.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, notiValidate.fullname),
      soDT: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/,
          notiValidate.phone
        ),
      term: yup.boolean().required().oneOf([true], notiValidate.term),
    }),
  });

  return (
    <>
      <Modal
        width="670px"
        wrapClassName="header_user_modal"
        title="Sign Up"
        open={setStatusModal.isRegister}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        // destroyOnClose={true}
        // afterClose={handleReset}
      >
        <p class="modal-description mb-6">
          Already have an account?{" "}
          <button
            onClick={() => {
              handleCancel();
              openLogin();
            }}
          >
            Login
          </button>
        </p>

        <form
          autoComplete="off" // tắt tự động điền
          noValidate //chặn validate tự động của trình duyệt
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-5 gap-y-6 pb-5"
        >
          <InputCustom
            contentLabel="Username"
            placeHolder="enter your account"
            name="taiKhoan"
            value={values.taiKhoan}
            onChange={handleChange}
            // for validate
            onBlur={handleBlur}
            errors={errors.taiKhoan}
            touched={touched.taiKhoan}
          />
          <InputCustom
            contentLabel="Email"
            placeHolder="enter your email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.email}
            touched={touched.email}
          />
          <InputCustom
            contentLabel="Password"
            placeHolder="enter your password"
            name="matKhau"
            // value={values.matKhau}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.matKhau}
            touched={touched.matKhau}
            type="password"
            enableShowPassBtn={true} // {true} to enable Toggle Show/Hide PW button
          />

          <InputCustom
            contentLabel="Re-Enter Password"
            placeHolder="re-enter password"
            name="matKhauCheck"
            // value={values.matKhauCheck}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.matKhauCheck}
            touched={touched.matKhauCheck}
            type="password"
            enableShowPassBtn={true} // {true} to enable Toggle Show/Hide PW button
          />
          <InputCustom
            contentLabel="Your Name"
            placeHolder="enter your name"
            name="hoTen"
            value={values.hoTen}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.hoTen}
            touched={touched.hoTen}
          />
          <InputCustom
            contentLabel="Your Phone"
            placeHolder="enter your phone number"
            name="soDT"
            value={values.soDT}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.soDT}
            touched={touched.soDT}
          />
          <div className="flex col-span-2">
            <input
              className="cursor-pointer w-4 mr-2"
              name="term"
              value={values.term}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.term}
              touched={touched.term}
              type="checkbox"
              id="agree_privacy"
            />
            <label className="cursor-pointer" for="agree_privacy">
              Accept the{" "}
              <span className="modal-description">
                <Link>Terms and Privacy Policy</Link>
              </span>
            </label>
            {errors.term && touched.term && (
              <p className="text-red-500 block ml-5">{errors.term}</p>
            )}
          </div>
          <button
            className="w-full bg-blue-500 text-white text-[16px] font-semibold px-5 py-4 rounded-lg hover:bg-yellow-500 hover:text-[#252525] col-span-2"
            type="submit"
          >
            Register
          </button>
        </form>
      </Modal>
    </>
  );
};
export default Register;
