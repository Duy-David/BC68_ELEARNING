import React, { useEffect, useState } from "react";
import Iconheaders from "../Icon/Iconheaders";
// import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Link } from "react-router-dom";
const Header = () => {
  const [listCourseCategory, setListCoursCategory] = useState([]);
  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        console.log(res.data);
        setListCoursCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const items = listCourseCategory.map((category, index) => ({
    label: (
      <Link
      to={`/course-catelogies/:${category.maDanhMuc}`}
    >
      {category.tenDanhMuc}
    </Link>
    ),
    // key: category.maDanhMuc,
    key: index,
  }));
  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Iconheaders />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Header;
