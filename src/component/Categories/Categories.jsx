import React, { useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import IconDevelopment from "../Icon/categories/IconDevelopment";
import IconMobileDevelop from "../Icon/categories/IconMobileDevelop";
import IconNotFound404 from "../Icon/categories/IconNotFound404";
import IconBackEnd from "../Icon/categories/IconBackEnd";
import IconWebDesign from "../Icon/categories/IconWebDesign";
import IconFullStack from "../Icon/categories/IconFullStack";
import IconPersonalDevIdea from "../Icon/categories/IconPersonalDevIdea";
import "./../Icon/icon_style.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    quanLyKhoaHocService
      .getDanhMucKhoaHoc()
      .then((res) => {
        // console.log(res.data);

        const newListCategories = res.data.map((item) => {
          return { ...item, icon: getIcon(item.maDanhMuc) };
        });
        setListCategories(newListCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(listCategories);

  const getIcon = (maDanhMuc) => {
    switch (maDanhMuc) {
      case "BackEnd":
        return <IconBackEnd className="categories-item__icon" />;

      case "Design":
        return <IconWebDesign className="categories-item__icon" />;

      case "DiDong":
        return <IconMobileDevelop className="categories-item__icon" />;

      case "FrontEnd":
        return <IconDevelopment className="categories-item__icon" />;

      case "FullStack":
        return <IconFullStack className="categories-item__icon" />;

      case "TuDuy":
        return <IconPersonalDevIdea className="categories-item__icon" />;

      default:
        return <IconNotFound404 className="categories-item__icon notFound" />;
    }
  };

  return (
    <section className="py-12 px-3">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-10">
          Top <mark>Categories</mark>
        </h2>
        <div className="flex gap-5 w-full flex-wrap">
          {listCategories.map((item, index) => {
            return (
              <div
                className="categories-item w-full md:w-[48%] lg:w-[32%]"
                key={index}
              >
                <Link
                  to={`/course-catelogies/${item.maDanhMuc}`}
                  className="categories-item__link flex gap-x-3"
                >
                  {item.icon}
                  <div className="categories-item__info text-[17px]">
                    {item.tenDanhMuc}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;

// https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc

// [
//   {   <CloudServerOutlined />
//     maDanhMuc: "BackEnd",
//     tenDanhMuc: "Lập trình Backend",
//   },
//   {
//     maDanhMuc: "Design",
//     tenDanhMuc: "Thiết kế Web",
//   },
//   {   <FontAwesomeIcon icon={faCode} />
//     maDanhMuc: "DiDong",
//     tenDanhMuc: "Lập trình di động",
//   },
//   {
//     maDanhMuc: "FrontEnd",
//     tenDanhMuc: "Lập trình Front end",
//   },
//   {
//     maDanhMuc: "FullStack",
//     tenDanhMuc: "Lập trình Full Stack",
//   },
//   {
//     maDanhMuc: "TuDuy",
//     tenDanhMuc: "Tư duy lập trình",
//   },
// ];
