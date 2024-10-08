import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Space, Tabs } from "antd";
import Instructor from "../../component/Instructor/Instructor";
import { NotificationContext } from "../../App";
import { useLottie } from "lottie-react";
import HelloAnimation from "../../assets/animation/Animation-HELLO.json";
import { pathDefault } from "../../common/path";
import MyCourses from "../MyCourses/MyCourses";
import MyCart from "../MyCart/MyCart";
import WithLoading from "../../component/WithLoading/WithLoading";
import { getLocalStorage, setLocalStorage } from "../../util/util";

const PersonalInformation = () => {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  // fix tabs antd
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "1";

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

  const options = {
    animationData: HelloAnimation,
    loop: true,
  };
  const { View: LottieView } = useLottie(options);

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

            <div className="md:w-1/2 w-full"> {LottieView}</div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <p>Personal Information</p>,
      children: (
        <WithLoading>
          <h2 className="text-center text-6xl my-8">BASIC INFOMATION</h2>
          <div className="grid grid-cols-2 gap-7 px-8">
            {userFields.map(([label, value], index) => (
              <p key={index} className=" text-2xl">
                <span className="font-medium"> {label}</span>: {value}
              </p>
            ))}
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
