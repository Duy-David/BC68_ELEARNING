import React, { useContext } from "react";
import {
  FolderOpenOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PoweroffOutlined,
  TeamOutlined,
  ToolFilled,
  ToolOutlined,
  ToolTwoTone,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemLocalStorage } from "../../util/util";
import { setValueUser } from "../../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { NotificationContext } from "../../App";
import { pathChildren, pathDefault } from "../../common/path";
import useResponsive from "../../hooks/useResponsive";

const LoggedInUserInfo = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);
  const isLoggedIn = !!user;

  const dispatch = useDispatch();
  const isResponsive = useResponsive({
    sm: 640,
    md: 768,
    lg: 1024,
  });

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
    user.maLoaiNguoiDung === "GV"
      ? {
          label: (
            <Link to={pathChildren.managerUser} className="font-semibold ">
              Go to Admin Page
            </Link>
          ),
          key: "0",
          icon: <ToolFilled />,
        }
      : null,

    {
      label: <Link to={pathDefault.homePage}>My Message</Link>,
      key: "1",
      icon: <MailOutlined />,
    },
    {
      label: (
        <Link to={`/personal-infornation/${user.taiKhoan}?tab=2`}>
          My Profile
        </Link>
      ),
      key: "2",
      icon: <InfoCircleOutlined />,
    },
    {
      label: (
        <Link to={`/personal-infornation/${user.taiKhoan}?tab=3`}>My Cart</Link>
      ),
      key: "3",
      icon: <FontAwesomeIcon icon={faBasketShopping} />,
    },
    {
      label: (
        <Link to={`/personal-infornation/${user.taiKhoan}?tab=4`}>
          My Course
        </Link>
      ),
      key: "4",
      icon: <FolderOpenOutlined />,
    },
    {
      label: <Link to={pathDefault.homePage}>Refer a Friend</Link>,
      key: "5",
      icon: <GiftOutlined />,
    },
    {
      label: (
        <Link
          to={`${
            user.maLoaiNguoiDung == "HV"
              ? "#become-teacher"
              : "#list-class-teaching"
          }`}
        >
          {user.maLoaiNguoiDung == "HV"
            ? "Become a Teacher"
            : "The class you are teaching"}
        </Link>
      ),
      key: "6",
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
      key: "7",
      icon: <PoweroffOutlined />,
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
          <span className="font-semibold hover:text-[#0071dc] hidden xl:inline-block">
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