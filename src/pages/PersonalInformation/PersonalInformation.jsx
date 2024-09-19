import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Radio, Space, Tabs } from "antd";
import Instructor from "../../component/Instructor/Instructor";
import { NotificationContext } from "../../App";
import { useLottie } from "lottie-react";
import HelloAnimation from "../../assets/animation/Animation-HELLO.json";
import { pathDefault } from "../../common/path";
const PersonalInformation = () => {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  // console.log(user);
  const dispatch = useDispatch();
  // const { handleNotification } = useContext(NotificationContext);
  const options = {
    animationData: HelloAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
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
                Welcome {user.taiKhoan}
              </h2>
              <p className="text-center text-xl italic link-style">
                Manage your info, privacy, and security to get EduMall course
                better for you. <Link>Learn more</Link>
              </p>
            </div>

            <div className="md:w-1/2 w-full">{View}</div>
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
      children: <>aza</>,
    },
  ];
  useEffect(() => {
    if (user) {
      // Điều hướng đến URL với hoTen bằng user.taiKhoan
      navigate(`/personal-infornation/${user.taiKhoan}`);
    }else {
      navigate(`/${pathDefault.login}`)
    }
  }, [user, navigate]);
  const [tabPosition, setTabPosition] = useState("left");

  return (
    <>
      <div className="container">
        <Space
          style={{
            marginBottom: 24,
          }}
        ></Space>
        <Tabs tabPosition={tabPosition} items={items} />
      </div>
    </>
  );
};

export default PersonalInformation;
