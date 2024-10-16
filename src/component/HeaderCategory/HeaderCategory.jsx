import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Link } from "react-router-dom";
import IconCategory from "../Icon/Iconheaders";
import useResponsive from "../../hooks/useResponsive";

const HeaderCategory = () => {
  const breakpoints = {
    xs: 468,
    sm: 640,
    md: 768,
    lg: 1024,
  };

  const isResponsive = useResponsive(breakpoints);
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
  // const renderCategory = () => {
  //   // // Ẩn ở xs
  //   // if (isResponsive.xs) {
  //   //   return null;
  //   // }

  //   // Hiện từ sm đến md (415px - 768px)
  //   // if (!isResponsive.xs && isResponsive.md) {
  //   //   return <span>Category</span>;
  //   // }
  //   // if (!isResponsive.md && isResponsive.lg) {
  //   //   return null;
  //   // }
  //   // Hiện khi > lg (lớn hơn 1024px)
  //   if (!isResponsive.lg
  //     || (isResponsive.md && !isResponsive.xs)
  //   ) {
  //     return <span>Category</span>;
  //   } else {
  //     return null;
  //   }
  // };
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
          {isResponsive.xs ? (
            <></>
          ) : isResponsive.xs && !isResponsive.md ? (
            isResponsive.lg ? (
              <></>
            ) : (
              <span>Category</span>
            )
          ) : (
            <span>Category</span>
          )}
        </div>
      </Button>
    </Dropdown>
  );
};
export default HeaderCategory;
