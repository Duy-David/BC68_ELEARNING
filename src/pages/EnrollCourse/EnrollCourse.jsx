import React, { useContext, useEffect, useState } from "react";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { Select, Table, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import WithLoading from "../../component/WithLoading/WithLoading";
const { Search } = Input;

const EnrollCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { maKhoaHoc } = useParams();
  const { handleNotification } = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authSlice);
  const courseCategoriesMatch = window.location.pathname.match(
    /\/ghi-danh-khoa-hoc\/([^/]+)$/
  );

  const [course, setCourse] = useState(null);
  const [userUnEnroll, setUserUnEnroll] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [waitListData, setWaitListData] = useState([]);
  const [searchWaitList, setSearchWaitList] = useState([]);
  const [enrolledList, setEnrolledList] = useState([]);
  const [searchEnrolledList, setSearchEnrolledList] = useState([]);

  const fetchUserUnEnroll = (course) => {
    if (!course) {
      handleNotification("không có thông tin khoá học.", "info");
      return;
    }

    quanLyKhoaHocService
      .getLayDanhSachNguoiDungChuaGhiDanh({ maKhoaHoc }, user.accessToken)
      .then((res) => {
        setUserUnEnroll(res.data);
      })
      .catch((err) => {
        console.log(err);

        handleNotification(
          err.response?.data || "Đã xảy ra lỗi không xác định",
          "error"
        );
      });
  };

  const fetchWaitListData = () => {
    if (!courseCategoriesMatch) return;

    quanLyKhoaHocService
      .postLayDanhSachHocVienChoXetDuyet(maKhoaHoc, user.accessToken)
      .then((res) => {
        setWaitListData(res.data);
        setSearchWaitList(res.data);
      })
      .catch((err) => {
        handleNotification(
          err.response?.data || "Đã xảy ra lỗi không xác định",
          "error"
        );
      });
  };

  const fetchCourseStudentsList = () => {
    if (!courseCategoriesMatch) return;

    quanLyKhoaHocService
      .postDanhSachHocVienKhoaHoc(maKhoaHoc, user.accessToken)
      .then((res) => {
        setEnrolledList(res.data);
        setSearchEnrolledList(res.data);
      })
      .catch((err) => {
        handleNotification(
          err.response?.data || "Đã xảy ra lỗi không xác định",
          "error"
        );
      });
  };

  const handleEnroll = (selectedUser) => {
    if (selectedUser.length === 0) {
      handleNotification("Vui lòng chọn người dùng để ghi danh.", "info");
      return;
    }

    const enrollData = {
      maKhoaHoc: course.maKhoaHoc,
      taiKhoan: selectedUser,
    };

    quanLyKhoaHocService
      .postGhiDanhKhoaHoc(enrollData, user.accessToken)
      .then((res) => {
        console.log(res);
        handleNotification(res.data, "success");
        setWaitListData((prevData) => [...prevData, ...res.data]);
        setSelectedUser([]);
        fetchWaitListData();
        fetchUserUnEnroll(course);
        fetchCourseStudentsList();
      })
      .catch((err) => {
        console.log();
        handleNotification(
          err.response?.data || "Đã xảy ra lỗi không xác định",
          "error"
        );
      });
  };

  const handleCancelEnroll = (taiKhoan) => {
    quanLyKhoaHocService
      .deletedHuyGhiDanh(maKhoaHoc, taiKhoan, user.accessToken)
      .then(() => {
        setWaitListData(
          waitListData.filter((user) => user.taiKhoan !== taiKhoan)
        );
        handleNotification("Huỷ ghi danh thành công", "success");
        fetchUserUnEnroll(course);
        fetchCourseStudentsList();
        fetchWaitListData();
      })
      .catch((err) => {
        console.log(err);
        handleNotification(
          err.response?.data || "Đã xảy ra lỗi không xác định",
          "error"
        );
      });
  };

  useEffect(() => {
    const fetchInfoCourse = () => {
      if (courseCategoriesMatch) {
        quanLyKhoaHocService
          .getThongTinKhoaHoc(maKhoaHoc)
          .then((res) => {
            setCourse(res.data);
            fetchUserUnEnroll(res.data);
          })
          .catch((err) => {
            console.log(err);
            handleNotification(
              err.response?.data || "Đã xảy ra lỗi không xác định",
              "error"
            );
          });
      }
    };

    if (maKhoaHoc) {
      fetchInfoCourse();
      fetchWaitListData();
      fetchCourseStudentsList();
    }
  }, [maKhoaHoc]);

  const handleChange = (value) => setSelectedUser(value);
  const regexOptions = {
    escapeSpecialChars: (str) =>
      str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    caseInsensitive: "gi",
  };
  const handleSearchWaitList = (value) => {
    const regex = new RegExp(
      regexOptions.escapeSpecialChars(value),
      regexOptions.caseInsensitive
    );
    const filteredData = waitListData.filter((user) => regex.test(user.hoTen));
    setSearchWaitList(filteredData);
  };
  const handleSearchEnrolledList = (value) => {
    const regex = new RegExp(
      regexOptions.escapeSpecialChars(value),
      regexOptions.caseInsensitive
    );
    const filteredData = enrolledList.filter((user) => regex.test(user.hoTen));
    setSearchEnrolledList(filteredData);
  };
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (value === "") {
      if (type === "waitList") {
        setSearchWaitList(waitListData);
      } else if (type === "enrolledList") {
        setSearchEnrolledList(enrolledList);
      }
    }
  };

  const columns = [
    {
      width: "25%",
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      width: "25%",
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      width: "25%",
      title: "Bí Danh",
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      width: "25%",
      title: "Hành Động",
      key: "action  ",
      render: (text, record) => (
        <div>
          <button
            onClick={() => handleEnroll(record.taiKhoan)}
            className="text-blue-400 hover:text-blue-500 font-sans text-base border rounded  mr-10 px-2"
          >
            Xác thực
          </button>
          <button
            onClick={() => handleCancelEnroll(record.taiKhoan)}
            className="text-red-400 hover:text-red-500 font-sans text-base border rounded px-2"
          >
            Huỷ
          </button>
        </div>
      ),
    },
  ];
  const enrolledColumns = [
    {
      width: "25%",
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      width: "25%",
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      width: "25%",
      title: "Bí Danh",
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      width: "25%",
      title: "Hành Động",
      key: "action  ",
      render: (text, record) => (
        <div>
          <button
            onClick={() => handleCancelEnroll(record.taiKhoan)}
            className="text-red-400 hover:text-red-500 font-sans text-base border rounded px-2"
          >
            Huỷ
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container">
        <h3 className="text-black text-3xl mb-5">Ghi danh khoá học</h3>
        {course && (
          <div className="flex">
            <img src={course.hinhAnh} className="flex w-1/3  mr-5"></img>
            <div className="flex-col w-1/3 ml-5 h-full">
              <h4 className="font-sans text-lg font-bold mb-3">
                {course.tenKhoaHoc}
              </h4>
              <p className="font-sans text-base mb-2">
                Giảng Viên: {course.nguoiTao.hoTen}
              </p>
              <p className="font-sans text-base mb-2">
                Lượt xem: {course.luotXem}
              </p>
              <p className="font-sans text-base mb-2">Mô tả: {course.moTa}</p>
            </div>
            <div className="w-1/3 text-center">
              <h4 className="font-sans text-lg font-bold mb-3">
                Chọn người dùng
              </h4>
              <Select
                placeholder="tên người dùng(có thể search)"
                showSearch="true"
                allowClear="true"
                size="large"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={userUnEnroll.map((user) => ({
                  value: user.taiKhoan,
                  label: user.hoTen,
                }))}
                value={selectedUser}
              />
              <button
                onClick={() => handleEnroll(selectedUser)}
                className="items-center text-center font-sans text-base text-black border-spacing-1 border px-4 py-3 rounded bg-yellow-300 hover:bg-yellow-400 hover:text-black mt-5"
              >
                Ghi danh
              </button>
            </div>
          </div>
        )}
        <hr className="my-5" />
        <div className="mt-5">
          <div className="flex justify-between mb-5">
            <h4 className="font-sans text-lg font-bold mb-3">
              Học viên chờ xác thực
            </h4>
            <Search
              placeholder="Tìm kiếm tên người dùng"
              onSearch={(value) => handleSearchWaitList(value)}
              className=" w-1/2"
              onChange={(e) => handleInputChange(e, "waitList")}
              size="large"
            />
          </div>
          <Table
            className="font-sans text-base"
            columns={columns}
            dataSource={searchWaitList}
          />
        </div>
        <hr className="my-5" />
        <div className="mt-5">
          <div className="flex justify-between mb-5">
            <h4 className="font-sans text-lg font-bold mb-3">
              Học viên đã tham gia khoá học
            </h4>
            <Search
              placeholder="Tìm kiếm tên người dùng"
              onSearch={(value) => handleSearchEnrolledList(value)}
              className=" w-1/2"
              onChange={(e) => handleInputChange(e, "enrolledList")}
              size="large"
            />
          </div>
          <Table
            className="font-sans text-base"
            columns={enrolledColumns}
            dataSource={searchEnrolledList}
          />
        </div>
      </div>
    </>
  );
};

export default EnrollCourse;
