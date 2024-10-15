import React, { useContext, useEffect, useState } from "react";
import { Select } from "antd";
import { Space, Table, Input } from "antd";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../App";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";
const { Search } = Input;

const ManagerUserRegister = () => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const [options, setOptions] = useState([]);
  const [maKhoaHoc, setMaKhoaHoc] = useState("");
  const [xacThuc, setXacThuc] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [newRegister, setNewRegister] = useState(true);
  const [newXacThuc, setNewXacThuc] = useState(true);
  const [selectValue, setSelectValue] = useState(null);
  const [waitingData, setWaitingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [user, setUser] = useState(null);
  const { handleNotification } = useContext(NotificationContext);
  const [searchWaitList, setSearchWaitList] = useState([]);
  const [searchEnrolledList, setSearchEnrolledList] = useState([]);
  const getAllKhoaHoc = () => {
    quanLyKhoaHocService
      .layDanhSachKhoaHoc("")
      .then((res) => {
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        console.log("error in get all khoa hoc: ", err);
      });
  };
  useEffect(() => {
    getAllKhoaHoc();
  }, []);

  const waiting_columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên Khoá Học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleXacThuc(record)}
            className="bg-blue-500 py-2 px-3 rounded-md text-white font-bold"
          >
            Xác Thực
          </button>
          <button
            onClick={() => handleHuyGhiDanh(record)}
            className="bg-red-500 py-2 px-3 rounded-md text-white font-bold"
          >
            Huỷ
          </button>
        </Space>
      ),
    },
  ];

  // approved course
  const approved_columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên Khoá Học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleHuyGhiDanh(record)}
            className="bg-red-500 py-2 px-3 rounded-md text-white font-bold"
          >
            Huỷ
          </button>
        </Space>
      ),
    },
  ];

  // Huy ghi danh
  const handleHuyGhiDanh = (record) => {
    const data = {
      maKhoaHoc: record.maKhoaHoc,
      taiKhoan: taiKhoan,
    };
    quanLyKhoaHocService
      .postHuyGhiDanh(accessToken, data)
      .then((res) => {

        handleNotification(res.data, "success");
        setNewRegister((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        handleNotification("Có lỗi xảy ra, vui lòng thử lại!", "error");
      });
  };

  // Lấy taiKhoan user
  const { taiKhoan } = useParams();

  // Lấy mã khoá học
  const handleChange = (value) => {
    setSelectValue(value);
    setMaKhoaHoc(value);
  };
  useEffect(() => {
    nguoiDungService
      .timKiemNguoiDung(taiKhoan)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        handleNotification(err.response.data, "error");
      });
  }, []);

  //   lấy danh sách khoá học chưa ghi danh
  useEffect(() => {
    nguoiDungService
      .layDanhSachKhoaHocChuaDangKy(accessToken, taiKhoan)
      .then((res) => {
        const khoaHocArr = res.data;

        // SET OPTIONS
        const khoaHocSelect = khoaHocArr.map((item, index) => {
          return {
            value: item.maKhoaHoc,
            label: item.tenKhoaHoc,
          };
        });
        setOptions(khoaHocSelect);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newRegister]);

  // Lấy danh sách khoá học chờ xét duyệt
  useEffect(() => {
    let data = {
      taiKhoan: taiKhoan,
    };
    nguoiDungService
      .layDanhSachKhoaHocChoXetDuyet(accessToken, data)
      .then((res) => {
        const khoaHocArr = res.data;

        const waitingArr = khoaHocArr.map((item, index) => {
          return {
            stt: index + 1,
            tenKhoaHoc: item.tenKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
          };
        });
        setWaitingData(waitingArr);
        setSearchWaitList(waitingArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newXacThuc, newRegister]);

  // Lấy danh sách khoá học đã xét duyệt
  useEffect(() => {
    let data = {
      taikhoan: taiKhoan,
    };
    nguoiDungService
      .layDanhSachKhoaHocDaXetDuyet(accessToken, data)
      .then((res) => {
       
        const khoaHocArr = res.data;

        // Set approved data
        const approvedArr = khoaHocArr.map((item, index) => {
          return {
            stt: index + 1,
            tenKhoaHoc: item.tenKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
          };
        });
        setApprovedData(approvedArr);
        setSearchEnrolledList(approvedArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newRegister]);

  // Handle Xác Thực
  const handleXacThuc = (record) => {
    if (record) {
      setMaKhoaHoc(record.maKhoaHoc);
      setXacThuc((prev) => !prev);
    }
  };
  useEffect(() => {
    if (!loadingPage) {
      handleRegister();
    } else {
      setLoadingPage(false);
    }
  }, [xacThuc]);

  // Handle Register
  const handleRegister = () => {
    const info = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: taiKhoan,
    };
    quanLyKhoaHocService
      .postGhiDanhKhoaHoc(info, accessToken)
      .then((res) => {
        handleNotification("Ghi Danh thành công!", "success");
        setNewRegister((prev) => !prev);
        setNewXacThuc((prev) => !prev);
        setSelectValue(null);
      })
      .catch((err) => {
        console.log(err);
        handleNotification("Có lỗi xảy ra, vui lòng thử lại!", "error");
      });
  };
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
    const filteredData = waitingData.filter((course) =>
      regex.test(course.tenKhoaHoc)
    );
    setSearchWaitList(filteredData);
  };
  const handleSearchEnrolledList = (value) => {
    const regex = new RegExp(
      regexOptions.escapeSpecialChars(value),
      regexOptions.caseInsensitive
    );
    const filteredData = approvedData.filter((course) =>
      regex.test(course.tenKhoaHoc)
    );
    setSearchEnrolledList(filteredData);
  };
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (value === "") {
      if (type === "waitList") {
        setSearchWaitList(waitingData);
      } else if (type === "enrolledList") {
        setSearchEnrolledList(approvedData);
      }
    }
  };
  return (
    <div className="manager_user_register">
      <div className="container">
        <h3 className="text-black text-3xl mb-5">Ghi danh khoá học</h3>

        <div
          className="grid grid-cols-2  pb-20"
          style={{ borderBottom: "1px solid black" }}
        >
          <div className="col-span-1 flex">
            {user?.maLoaiNguoiDung == "HV" ? (
              <>
                <UserOutlined className="iconUser text-[100px] bg-[#cdaa35] text-white px-10 rounded-full" />
              </>
            ) : (
              <>
                <span className="iconUser text-[100px] bg-[#cdaa35] text-white px-10 rounded-full">
                  <FontAwesomeIcon icon={faMedal} />
                </span>
              </>
            )}
            <div className="flex-col col-span-1  ml-5 h-full">
              <h4 className="font-sans text-lg font-bold mb-3">
                Tài khoản: {user?.taiKhoan}
              </h4>
              <p className="font-sans text-base mb-2">
                Tên học viên: {user?.hoTen}
              </p>
              <p className="font-sans text-base mb-2">Email: {user?.email}</p>
              <p className="font-sans text-base mb-2">
                Điện thoại: {user?.soDt}
              </p>
              <p className="font-sans text-base mb-2">
                Chức danh: {user?.tenLoaiNguoiDung}
              </p>
            </div>
          </div>

          <div className="manager_user_select_course col-span-1 flex-col  text-center">
            <h4 className="font-sans text-lg font-bold mb-3">Chọn khoá học</h4>
            <Select
              // mode="tags"
              showSearch="true"
              allowClear="true"
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn Khoá Học Chưa Ghi Danh"
              onChange={handleChange}
              options={options}
              value={selectValue}
            />

            <button
              className="user_course_register px-4 py-3 mt-5 bg-blue-500 text-white font-bold rounded-md hover:bg-yellow-5`00   font-sans text-base"
              onClick={handleRegister}
            >
              Ghi Danh
            </button>
          </div>
        </div>
        <div
          className="waiting_course "
          style={{ borderBottom: "1px solid black" }}
        >
          <div className="flex justify-between my-6">
            <h4 className="font-sans text-lg font-bold mb-3">
              Khoá học chờ xác thực
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
            key={searchWaitList.length}
            pagination={{ pageSize: 5 }}
            columns={waiting_columns}
            dataSource={searchWaitList}
          />
          ;
        </div>
        <div className="approved_course">
          <div className="flex justify-between my-6">
            <h4 className="font-sans text-lg font-bold mb-3">
              Khoá học đã ghi danh
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
            key={searchEnrolledList.length}
            pagination={{ pageSize: 5 }}
            columns={approved_columns}
            dataSource={searchEnrolledList}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default ManagerUserRegister;
