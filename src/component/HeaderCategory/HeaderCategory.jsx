import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Link } from "react-router-dom";
import IconCategory from "../Icon/Iconheaders";
import useResponsive from "../../hooks/useResponsive";

const HeaderCategory = () => {
  const isResponsive = useResponsive({
    fixsm: 675,
    sm: 640,
    md: 768,
    lg: 1024,
  })

  // const isResponsive = useResponsive(breakpoints);
  const [listCourseCategory, setListCoursCategory] = useState([]);
  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        setListCoursCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const items = listCourseCategory.map((category, index) => ({
    key: index,
    label: (
      <Link to={`/course-catelogies/${category.maDanhMuc}`}>
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
        <div className="category_icon flex">
          <IconCategory />
          {!isResponsive.fixsm ? <span>Category</span> : <></>}
        </div>
      </Button>
    </Dropdown>
  );
};
export default HeaderCategory;
