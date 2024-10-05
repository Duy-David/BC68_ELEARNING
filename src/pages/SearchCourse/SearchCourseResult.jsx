import { Breadcrumb, Card } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import CourseCard from "../../component/CourseCard/CourseCard";
import WithLoading from "../../component/WithLoading/WithLoading";

const SearchCourseResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const valueParams = searchParams.get("tenKhoaHoc");
  const [listCourseSearch, setListCourseSearch] = useState([]);

  useEffect(() => {
    // có tên khóa học trên query params mới chạy search
    if (valueParams) {
      quanLyKhoaHocService
        .searchKhoaHocTheoTen(valueParams)
        .then((res) => {
          //   console.log(res.data.length);
          if (res.data.length > 0) {
            setListCourseSearch(res.data);
          } else {
            setListCourseSearch([]);
          }
        })
        .catch((err) => {
          console.log(err);
          setListCourseSearch([]);
        });
    }
  }, [valueParams]);

  return (
    <WithLoading>
      <div className="container mx-auto pb-10 px-3">
        <Breadcrumb
          separator=""
          className="py-5"
          items={[
            {
              title: <Link to={pathDefault.homePage}>Home</Link>,
            },
            {
              type: "separator",
            },
            {
              title: "Search Course",
            },
            {
              type: "separator",
              separator: ": keyword = ",
            },
            {
              title: <span className="capitalize">" {valueParams} "</span>,
            },
          ]}
        />

        <div className="text-center mb-5 line_deco">
          <span>
            {console.log(listCourseSearch)}
            {listCourseSearch.length < 1 ? (
              "No matching courses found"
            ) : (
              <>
                We found{" "}
                <strong className="text-[16px] font-semibold">
                  {listCourseSearch.length}
                </strong>{" "}
                {listCourseSearch.length === 1 ? "course" : "courses"} available
                for you
              </>
            )}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-12">
          {listCourseSearch.map((item) => (
            <div className="course-item" key={item.maKhoaHoc}>
              <CourseCard course={item} />
            </div>
          ))}
        </div>
      </div>
    </WithLoading>
  );
};

export default SearchCourseResult;
