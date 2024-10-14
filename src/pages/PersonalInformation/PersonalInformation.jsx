import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Space, Tabs } from "antd";
import Instructor from "../../component/Instructor/Instructor";
import { NotificationContext } from "../../App";
import { useLottie } from "lottie-react";
import HelloAnimation from "../../assets/animation/Animation-HELLO.json";
import MyCourses from "../MyCourses/MyCourses";
import MyCart from "../MyCart/MyCart";
import WithLoading from "../../component/WithLoading/WithLoading";
import { getLocalStorage, setLocalStorage } from "../../util/util";
import { useFormik } from "formik";
import * as yup from "yup";
import InputCustormMin from "../../component/Input/InputCustormMin";
import { notiValidate } from "../../common/notiValidate";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { setValueUser } from "../../redux/authSlice";
import useResponsive from "../../hooks/useResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";

const PersonalInformation = () => {
  const location = useLocation();
  const [editStatus, setEditSatatus] = useState("");
  const { user } = useSelector((state) => state.authSlice);
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fix tabs antd
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "1";
  const isResponsive = useResponsive({
    sm: 640,
    md: 768,
    lg: 1024,
  });

  // fix show welcome robot
  const [robotLoaded, setRobotLoaded] = useState(() => {
    return getLocalStorage("robotLoaded") === "true";
  });
  const handleTabChange = (key) => {
    if (key === "1" && !robotLoaded) {
      setLocalStorage("robotLoaded", "true");
      window.location.href = `/personal-infornation/${user.taiKhoan}?tab=1`;
    } else {
      setSearchParams({ tab: key }); // important! => để text và hình render cùng lúc
    }
  };

  useEffect(() => {
    // Nếu URL query param ko có tab => tự động set tab mặc định (tab=1) để đảm bảo trang userinformation luôn đc chạy
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "1" });
    }
  }, [searchParams, setSearchParams]);

  const [tabPosition, setTabPosition] = useState("left");

  const options = {
    animationData: HelloAnimation,
    loop: true,
  };
  const { View: LottieView } = useLottie(options);
  const {
    handleSubmit,
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleReset,
  } = useFormik({
    initialValues: {
      taiKhoan: user.taiKhoan,
      email: user.email,
      matKhau: "",
      hoTen: user.hoTen,
      soDT: user.soDT,
      maNhom: user.maNhom,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    },
    // validate
    validationSchema: yup.object({
      email: yup
        .string()
        .required(notiValidate.empty)
        .email(notiValidate.email),
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
    }),
    onSubmit: (values) => {
      nguoiDungService
        .putThongTinNguoiDung(values, user.accessToken)
        .then((res) => {
          setLocalStorage("user", {
            ...res.data,
            soDT: res.data.soDt,
            matKhau: "",
            accessToken: user.accessToken,
          });
          dispatch(
            setValueUser({
              ...res.data,
              soDT: res.data.soDt,
              matKhau: "",
              accessToken: user.accessToken,
            })
          );
          handleNotification("Cập nhật thành công!", "success");
        })
        .catch((err) => {
          handleNotification(
            `ERROR! ${err.message && ":: " + err.message} ${
              err.response.data && ":: " + err.response.data
            }`,
            "error"
          );
        });

      setEditSatatus("");
    },
  });

  const items = [
    {
      key: "1",
      label: <p>Welcome back!</p>,
      children: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" w-full px-5 flex flex-col justify-center">
              {" "}
              <h2 className="text-center text-5xl mt-8 mb-4">
                Welcome back, {user.taiKhoan}
              </h2>
              <p className="text-center text-xl  ">
                Manage your info, privacy, and security to get EduMall course
                better for you.{" "}
                <button
                  onClick={() => handleTabChange("2")}
                  className="text-blue-500 italic link-style hover:text-blue-800 font-normal"
                >
                  Learn more
                </button>
              </p>
            </div>

            <div className=" w-full"> {LottieView}</div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <p>My Profile</p>,
      children: (
        <WithLoading>
          <h2 className="text-center text-5xl my-6">BASIC INFORMATION</h2>
          <div className=" grid gird-col-1 lg:grid-cols-3">
            <div className=" text-center  col-span-1 align-top">
              {" "} 
              {user?.maLoaiNguoiDung == "HV" ? (
                <>
                  <UserOutlined className="iconUser text-[190px]  bg-[#a23f6e] text-white rounded-lg" />
                </>
              ) : (
                <>
                  <span className="iconUser text-[190px] bg-[#cdaa35] px-8 text-white rounded-full">
                    <FontAwesomeIcon icon={faMedal} />
                  </span>
                </>
              )}
            </div>

            <form 
              className={`updateInfoUser${
                editStatus != "" ? " " + editStatus : ""
              } lg:col-span-2 col-span-1` }
            >
              <div className="grid grid-cols-1 w-fit mx-auto lg:grid-cols-2 lg:w-auto gap-5 px-8">
                <InputCustormMin
                  classWrapper="flex items-center gap-x-3 text-xl"
                  contentLabel="Account:"
                  classLabel="font-medium"
                  className="p-2"
                  value={values?.taiKhoan}
                  disabled
                />
                <InputCustormMin
                  classWrapper="flex items-center gap-x-3 text-xl"
                  contentLabel="Email:"
                  classLabel="font-medium"
                  className={`p-2${
                    editStatus === "editing" ? "" : " disabled"
                  }`}
                  name="email"
                  onChange={handleChange}
                  value={values?.email}
                  onBlur={handleBlur}
                  errors={errors.email}
                  touched={touched.email}
                />
                <InputCustormMin
                  classWrapper="flex items-center gap-x-3 text-xl"
                  contentLabel="Full Name:"
                  classLabel="font-medium"
                  className={`p-2${
                    editStatus === "editing" ? "" : " disabled"
                  }`}
                  name="hoTen"
                  onChange={handleChange}
                  value={values?.hoTen}
                  onBlur={handleBlur}
                  errors={errors.hoTen}
                  touched={touched.hoTen}
                />
                <InputCustormMin
                  classWrapper="flex items-center gap-x-3 text-xl"
                  contentLabel="Phone:"
                  classLabel="font-medium"
                  className={`p-2${
                    editStatus === "editing" ? "" : " disabled"
                  }`}
                  name="soDT"
                  onChange={handleChange}
                  value={values?.soDT}
                  onBlur={handleBlur}
                  errors={errors.soDT}
                  touched={touched.soDT}
                />
                <InputCustormMin
                  classWrapper="flex items-center gap-x-3 text-xl"
                  contentLabel="Group Code:"
                  classLabel="font-medium"
                  className={`p-2${
                    editStatus === "editing" ? "" : " disabled"
                  }`}
                  name="maNhom"
                  onChange={handleChange}
                  value={values?.maNhom}
                  disabled
                />
                <InputCustormMin
                  classWrapper="flex items-center gap-x-3 text-xl"
                  contentLabel="Role:"
                  classLabel="font-medium"
                  className="p-2"
                  name="maLoaiNguoiDung"
                  value={user.maLoaiNguoiDung === "GV" ? "Teacher" : "Student"}
                  disabled
                />

                <div className="flex items-center justify-end gap-x-10 mt-3">
                  {editStatus === "editing" ? (
                    <button
                      className="px-3 py-2 font-semibold text-sm text-white bg-red-600 hover:bg-red-900 rounded-lg shadow-md"
                      type="button"
                      onClick={() => {
                        setValues(user);
                        setEditSatatus("");
                      }}
                    >
                      Cancel
                    </button>
                  ) : null}
                  <button
                    onClick={() => {
                      if (editStatus === "editing") {
                        handleSubmit();
                      }

                      setEditSatatus("editing");
                    }}
                    className="px-3 py-2 font-semibold text-sm bg-blue-600 hover:bg-yellow-500 text-white rounded-lg shadow-md"
                    type="button"
                  >
                    {editStatus === "editing" ? "Update" : "Edit information"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Instructor />
        </WithLoading>
      ),
    },
    {
      key: "3",
      label: <p>My Cart</p>,
      children: (
        <WithLoading>
          <MyCart />
        </WithLoading>
      ),
    },
    {
      key: "4",
      label: <p> My Course</p>,
      children: (
        <WithLoading>
          <MyCourses />
        </WithLoading>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto pb-10 px-3">
        <Space
          style={{
            marginBottom: 24,
          }}
        ></Space>
        <Tabs
          tabPosition={isResponsive.md ? "top" : "left"}
          items={items}
          activeKey={currentTab}
          onChange={handleTabChange}
          // defaultActiveKey="3"
          centered={isResponsive.md}
        />
      </div>
    </>
  );
};

export default PersonalInformation;
