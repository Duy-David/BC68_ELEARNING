import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Link } from "react-router-dom";
import IconCategory from "../Icon/Iconheaders";

const HeaderCategory = () => {
  const [listCourseCategory, setListCoursCategory] = useState([]);
  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        // console.log(res.data);
        setListCoursCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const items = listCourseCategory.map((category, index) => ({
    key: index,
    label: (
      <Link to={`/course-catelogies/:${category.maDanhMuc}`}>
        {category.tenDanhMuc}
      </Link>
    ),
  }));

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow
    >
      <Button>
        <div className="category_icon">
          <IconCategory />
        </div>
      
      </Button>
    </Dropdown>
  );
};
export default HeaderCategory;
