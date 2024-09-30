import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Radio, Space, Tabs } from "antd";
import Instructor from "../../component/Instructor/Instructor";
import { NotificationContext } from "../../App";
import { useLottie } from "lottie-react";
import HelloAnimation from "../../assets/animation/Animation-HELLO.json";
import { pathDefault } from "../../common/path";
import MyCourses from "../../component/MyCourses/MyCourses";

const PersonalInformation = () => {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  // fix tabs antd
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "1";

  const handleTabChange = (key) => {
    setSearchParams({ tab: key });
  };

  useEffect(() => {
    // Nếu URL query param ko có tab => tự động set tab mặc định (tab=1) để đảm bảo trang userinformation luôn đc chạy
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "1" });
    }
  }, [searchParams, setSearchParams]);

  // console.log(user);
  const dispatch = useDispatch();
  // const { handleNotification } = useContext(NotificationContext);

  const userInfo = user
    ? {
        Account: user.taiKhoan,
        Email: user.email,
        "Full Name": user.hoTen,
        Phone: user.soDT,
        "Group Code": user.maNhom,
        Role: user.maLoaiNguoiDung === "GV" ? "Teacher" : "Student",
      }
    : {};
  const userFields = Object.entries(userInfo);
  const [tabPosition, setTabPosition] = useState("left");
  // const options = {
  //   animationData: HelloAnimation,
  //   loop: true,
  // };
  const [animationKey, setAnimationKey] = useState(0);

  const options = {
    animationData: HelloAnimation,
    loop: true,
  };
  const { View: LottieView } = useLottie(options);

  // Remount animation when switching back to tab 1
  console.log(currentTab)
  useEffect(() => {
    if (currentTab ===  "1") {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [currentTab]);
    // const { View } = useLottie(options);
  console.log(animationKey)
  const items = [
    {
      key: "1",
      label: <p>Home</p>,
      children: (
        <>
          <div className="flex space-x-6">
            <div className="md:w-1/2 w-full px-5 flex flex-col justify-center">
              {" "}
              <h2 className="text-center text-5xl mt-8 mb-4">
                Welcome back, {user.taiKhoan}
              </h2>
              <p className="text-center text-xl italic link-style">
                Manage your info, privacy, and security to get EduMall course
                better for you. <Link>Learn more</Link>
              </p>
            </div>

            <div className="md:w-1/2 w-full">
              {" "}
              {LottieView}
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <p>Personal Information</p>,
      children: (
        <>
          <h2 className="text-center text-6xl my-8">BASIC INFOMATION</h2>
          <div className="grid grid-cols-2 gap-7 px-8">
            {userFields.map(([label, value], index) => (
              <p key={index} className=" text-2xl">
                <span className="font-medium"> {label}</span>: {value}
              </p>
            ))}
          </div>
          <Instructor />
        </>
      ),
    },
    {
      key: "3",
      label: <p> My Course</p>,
      children: <MyCourses />,
    },
  ];

  // useEffect(() => {
  //   if (user) {
  //     // Điều hướng đến URL với hoTen bằng user.taiKhoan
  //     navigate(`/personal-infornation/${user.taiKhoan}`);
  //   } else {
  //     navigate(`/${pathDefault.login}`);
  //   }
  // }, [user, navigate]);

  return (
    <>
      <div className="container">
        <Space
          style={{
            marginBottom: 24,
          }}
        ></Space>
        <Tabs
          tabPosition={tabPosition}
          items={items}
          activeKey={currentTab}
          onChange={handleTabChange}
          // defaultActiveKey="3"
        />
      </div>
    </>
  );
};

export default PersonalInformation;
