import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { getLocalStorage } from "../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import WithLoading from "../../component/WithLoading/WithLoading";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const navigate = useNavigate();
  const handleBackToHomePage = () => {
    navigate("/");
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    let dataLocal = getLocalStorage("user");
    console.log(dataLocal);
    dataLocal.maLoaiNguoiDung !== "GV"
      ? (window.location.href = "https://www.google.com/")
      : null;
  }, []);

  return (
    <WithLoading>
      <>
        {" "}
        <Layout className="min-h-full">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[""]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: (
                    <Link to={"/admin/manager-user"}> Quản lý người dùng</Link>
                  ),
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: (
                    <Link to={"/admin/manager-course"}> Quản lý Khóa học</Link>
                  ),
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Button
                onClick={handleBackToHomePage}
                style={{ marginRight: "20px" }}
              >
                Back to HomePage
              </Button>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </>
    </WithLoading>
  );
};
export default AdminTemplate;
