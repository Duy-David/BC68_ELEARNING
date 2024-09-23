import React, { useContext } from "react";
import {
  FolderOpenOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MailOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemLocalStorage } from "../../util/util";
import { setValueUser } from "../../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { NotificationContext } from "../../App";
import { pathDefault } from "../../common/path";

const LoggedInUserInfo = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);
  const isLoggedIn = !!user;

  const dispatch = useDispatch();

  const handleLogout = () => {
    if (isLoggedIn && confirm("Bạn muốn Đăng xuất?")) {
      removeItemLocalStorage("user");
      dispatch(setValueUser(null));
      handleNotification(
        "Đăng xuất thành công. Bạn sẽ chuyển đến Homepage",
        "success"
      );
      navigate(pathDefault.homePage);
    }
  };

  const items = [
    {
      label: <Link to={pathDefault.homePage}>Your Message</Link>,
      key: "1",
      icon: <MailOutlined />,
    },
    {
      label: (
        <Link to={`/personal-infornation/${user.taiKhoan}?tab=2`}>
          Your Information
        </Link>
      ),
      key: "2",
      icon: <InfoCircleOutlined />,
    },
    {
      label: (
        <Link to={`/personal-infornation/${user.taiKhoan}?tab=3`}>
          Your Course
        </Link>
      ),
      key: "3",
      icon: <FolderOpenOutlined />,
    },
    {
      label: <Link to={pathDefault.homePage}>Refer a Friend</Link>,
      key: "4",
      icon: <GiftOutlined />,
    },
    {
      label: (
        <Link
          to={`${
            user.maLoaiNguoiDung == "HV"
              ? "javascript:void(0)#become-teacher"
              : "javascript:void(0)#list-class-teaching"
          }`}
        >
          {user.maLoaiNguoiDung == "HV"
            ? "Become a Teacher"
            : "The class you are teaching"}
        </Link>
      ),
      key: "5",
      icon:
        user.maLoaiNguoiDung == "HV" ? (
          <TeamOutlined />
        ) : (
          <UnorderedListOutlined />
        ),
    },
    {
      label: (
        <span onClick={handleLogout}>
          <strong>Logout</strong> ({user.taiKhoan})
        </span>
      ),
      key: "6",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Dropdown
      overlayClassName="headerUserProfile"
      placement="bottomRight"
      menu={{
        items,
      }}
      // trigger={["click"]}
      arrow
    >
      <Link
        // onClick={(e) => e.preventDefault()}
        className="ml-2 userOnline"
        title={`${user.taiKhoan} (${user.hoTen})`}
        to={`/personal-infornation/${user.taiKhoan}`}
      >
        <Space size={"small"}>
          <span className="font-semibold hover:text-[#0071dc] hidden lg:inline-block">
            {user.hoTen}
          </span>

          {user.maLoaiNguoiDung == "HV" ? (
            <>
              <UserOutlined className="iconUser text-xl bg-[#a23f6e] text-white p-[6px] rounded-full" />
            </>
          ) : (
            <>
              <span className="iconUser text-xl bg-[#cdaa35] text-white px-[6px] py-[4px] rounded-full">
                <FontAwesomeIcon icon={faMedal} />
              </span>
            </>
          )}
        </Space>
      </Link>
    </Dropdown>
  );
};
export default LoggedInUserInfo;
