import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../App";
import { Pagination, Rate, Button, Input, Tag } from "antd";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { nguoiDungService } from "../../service/nguoiDung.service";
import useResponsive from "../../hooks/useResponsive";
import { useSelector } from "react-redux";
const { Search } = Input;

const MyCourses = () => {
  const { handleNotification } = useContext(NotificationContext);
  const [coursesEnrolled, setCoursesEnrolled] = useState([]);
  const [approvedCourse, setApprovedCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 5;
  const { user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const fetchCoursesEnrolled = () => {
      nguoiDungService
        .getUserEnrolledCourses(user.accessToken, user.taiKhoan)
        .then((res) => {
          setCoursesEnrolled(res.data.chiTietKhoaHocGhiDanh);
        })
        .catch((err) => {
          handleNotification(err.response.data, "error");
        });
    };
    fetchCoursesEnrolled();
  }, [user.accessToken, user.taiKhoan, handleNotification]);

  useEffect(() => {
    const fetchCoursesRegister = () => {
      const data = { taiKhoan: user.taiKhoan };
      nguoiDungService
        .layDanhSachKhoaHocDaXetDuyet(user.accessToken, data)
        .then((res) => {
          setApprovedCourse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchCoursesRegister();
  }, [user.accessToken, user.taiKhoan]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUnEnroll = (maKhoaHoc) => {
    quanLyKhoaHocService
      .postHuyGhiDanh(user.accessToken, { maKhoaHoc, taiKhoan: user.taiKhoan })
      .then(() => {
        handleNotification("Hủy ghi danh thành công", "success");
        const updatedCourses = coursesEnrolled.filter(
          (course) => course.maKhoaHoc !== maKhoaHoc
        );
        setCoursesEnrolled(updatedCourses);
      })
      .catch((err) => {
        handleNotification(err.response.data, "error");
      });
  };

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
    setCurrentPage(1);
  };

  const filterCourses = coursesEnrolled.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(searchQuery)
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentCourses = filterCourses.slice(startIndex, startIndex + pageSize);

  const isResponsive = useResponsive({
    sm: 640,
    md: 768,
    lg: 1024,
  });

  return (
    <>
      <div>
        {!isResponsive.lg ? (
          <div className="mt-5 container w-full">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Enrolled courses</h2>
              <Search
                placeholder="Search a course..."
                onSearch={handleSearch}
                className=" w-1/2"
                size="large"
                allowClear
              />
            </div>
            {currentCourses.map((course) => {
              const isRegistered = approvedCourse.some(
                (approved) => approved.tenKhoaHoc === course.tenKhoaHoc
              );

              return (
                <div key={course.maKhoaHoc}>
                  <br />
                  <hr></hr>
                  <div className="flex mt-2 mb-5">
                    <div className="flex w-1/2 mr-5">
                      <img src={course.hinhAnh} className="w-full h-60"></img>
                    </div>
                    <div className="flex-row w-full">
                      <h3 className="text-lg font-semibold mb-3">
                        {course.tenKhoaHoc}
                      </h3>
                      <p className="text-base line-clamp-5 ">{course.moTa}</p>
                      <div className="inline-flex my-3">
                        <Rate allowHalf defaultValue={4.5} disabled />
                        <p className="mx-3">4.5</p>
                        <p>({course.luotXem})</p>
                      </div>
                      {isRegistered ? (
                        <div className="space-x-3">
                          <Tag color="#87d068" className="px-3 py-1 text-sm">
                            Registered Course
                          </Tag>
                        </div>
                      ) : (
                        <div className="space-x-3">
                          <Button
                            className="hover:bg-red-600"
                            type="primary"
                            danger
                            onClick={() => handleUnEnroll(course.maKhoaHoc)}
                          >
                            Cancel registration
                          </Button>
                          <Tag color="#2db7f5" className="px-3 py-1 text-sm">
                            Course pending registration
                          </Tag>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination
              style={{ display: "flex", justifyContent: "start" }}
              className="my-10"
              current={currentPage}
              total={filterCourses.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        ) : !isResponsive.md ? (
          <div className="mt-5 container w-11/12">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold mb-3">Enrolled courses</h2>
              <Search
                placeholder="Search a course..."
                onSearch={handleSearch}
                className=" w-full"
                size="large"
                allowClear
              />
            </div>
            {currentCourses.map((course) => {
              const isRegistered = approvedCourse.some(
                (approved) => approved.tenKhoaHoc === course.tenKhoaHoc
              );

              return (
                <div key={course.maKhoaHoc}>
                  <br />
                  <hr></hr>
                  <div className="flex flex-row mt-2 mb-5">
                    <div className="flex w-1/2 mr-5">
                      <img src={course.hinhAnh} className="w-full h-60"></img>
                    </div>
                    <div className="flex-row w-1/2">
                      <h3 className="text-lg font-semibold mb-3">
                        {course.tenKhoaHoc}
                      </h3>
                      <p className="text-base line-clamp-4 ">{course.moTa}</p>
                      <div className="inline-flex my-3">
                        <Rate allowHalf defaultValue={4.5} disabled />
                        <p className="mx-3">4.5</p>
                        <p>({course.luotXem})</p>
                      </div>
                      {isRegistered ? (
                        <Tag color="#87d068" className="px-3 py-1 text-sm">
                          Registered Course
                        </Tag>
                      ) : (
                        <Button
                          className="hover:bg-red-600"
                          type="primary"
                          danger
                          onClick={() => handleUnEnroll(course.maKhoaHoc)}
                        >
                          Cancel registration
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination
              style={{ display: "flex", justifyContent: "start" }}
              className="my-10"
              current={currentPage}
              total={filterCourses.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="mt-5 container w-11/12">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-3">Enrolled courses</h2>
              <Search
                placeholder="Search a course..."
                onSearch={handleSearch}
                className=" w-full"
                size="large"
                allowClear
              />
            </div>
            {currentCourses.map((course) => {
              const isRegistered = approvedCourse.some(
                (approved) => approved.tenKhoaHoc === course.tenKhoaHoc
              );

              return (
                <div key={course.maKhoaHoc}>
                  <br />
                  <hr></hr>
                  <div className="flex flex-col mt-2 mb-5">
                    <div className="flex w-full mr-5">
                      <img
                        src={course.hinhAnh}
                        className="w-full h-60 mb-2"
                      ></img>
                    </div>
                    <div className="flex-row w-full">
                      <h3 className="text-lg font-semibold mb-3">
                        {course.tenKhoaHoc}
                      </h3>
                      <p className="text-base line-clamp-4 ">{course.moTa}</p>
                      <div className="inline-flex my-3">
                        <Rate allowHalf defaultValue={4.5} disabled />
                        <p className="mx-3">4.5</p>
                        <p>({course.luotXem})</p>
                      </div>
                      {isRegistered ? (
                        <div className="space-x-3">
                          <Tag color="#87d068" className="px-3 py-1 text-sm">
                            Registered Course
                          </Tag>
                        </div>
                      ) : (
                        <div className="space-x-3">
                          <Button
                            className="hover:bg-red-600"
                            type="primary"
                            danger
                            onClick={() => handleUnEnroll(course.maKhoaHoc)}
                          >
                            Cancel registration
                          </Button>
                          <Tag color="#2db7f5" className="px-3 py-1 text-sm">
                            Course pending registration
                          </Tag>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination
              style={{ display: "flex", justifyContent: "start" }}
              className="my-10"
              current={currentPage}
              total={filterCourses.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;
