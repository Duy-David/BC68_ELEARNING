import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../component/Input/InputCustom";
import { Select } from "antd";
import { Space, Table, Tag } from "antd";
import { http } from "../../service/config";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../App";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";
// waiting course
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
    title: "Chờ Xác Nhận",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button className="bg-blue-500 py-2 px-3 rounded-md text-white font-bold">
          Xác Thực
        </button>
        <button className="bg-red-500 py-2 px-3 rounded-md text-white font-bold">
          Huỷ
        </button>
      </Space>
    ),
  },
];
const waiting_data = [
  {
    stt: "1",
    tenKhoaHoc: "John Brown",
    action: ["nice", "developer"],
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
    title: "Chờ Xác Nhận",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button className="bg-red-500 py-2 px-3 rounded-md text-white font-bold">
          Huỷ
        </button>
      </Space>
    ),
  },
];
const approved_data = [
  {
    stt: "1",
    tenKhoaHoc: "John Brown",
    action: ["nice", "developer"],
  },
];

const ManagerUserRegister = () => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const [options, setOptions] = useState([]);
  const [maKhoaHoc, setMaKhoaHoc] = useState("");
  const [waitingData, setWaitingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [user, setUser] = useState(null);
  const { handleNotification } = useContext(NotificationContext);

  // Lấy taiKhoan user
  const { taiKhoan } = useParams();

  // Lấy mã khoá học
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setMaKhoaHoc(value);
  };
  useEffect(() => {
    nguoiDungService
      .timKiemNguoiDung(taiKhoan)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
      })
      .catch((err) => {
        handleNotification(err.response.data, "error");
      });
  }, []);
  //   lấy danh sách khoá học
  useEffect(() => {
    quanLyKhoaHocService
      .layToanBoDanhSachKhoaHoc()
      .then((res) => {
        // console.log(res.data);
        const khoaHocArr = res.data;
        // SET OPTIONS
        const khoaHocSelect = khoaHocArr.map((item, index) => {
          return {
            // index: index,
            value: item.maKhoaHoc,
            label: item.tenKhoaHoc,
          };
        });
        setOptions(khoaHocSelect);
        // Set waitingData
        const waitingArr = khoaHocArr.map((item, index) => {
          return {
            stt: index + 1,
            tenKhoaHoc: item.tenKhoaHoc,
            // action: ["nice", "developer"],
          };
        });
        setWaitingData(waitingArr);

        // Set approved data
        const approvedArr = khoaHocArr.map((item, index) => {
          return {
            stt: index + 1,
            tenKhoaHoc: item.tenKhoaHoc,
            // action: ["nice", "developer"],
          };
        });
        setApprovedData(approvedArr);
      })
      .catch((err) => {
        // console.log(err.response.data);
        console.log(err);
      });
  }, []);

  // Handle Register

  const handleRegister = () => {
    const info = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: taiKhoan,
    };
    quanLyKhoaHocService
      .postGhiDanhKhoaHoc(info, accessToken)
      .then((res) => {
        // console.log(res);
        console.log(info);
        console.log(res.data);
        handleNotification(res.data, "success");
      })
      .catch((err) => {
        console.log(err);
        handleNotification("Có lỗi xảy ra, vui lòng thử lại!", "error");
      });
  };
  console.log(user);
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
                <UserOutlined className="iconUser text-6xl  bg-[#a23f6e] text-white px-12 rounded-full" />
              </>
            ) : (
              <>
                <span className="iconUser text-6xl bg-[#cdaa35] text-white px-12 rounded-full">
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
              placeholder="Chọn Khoá Học Ghi Danh"
              onChange={handleChange}
              options={options}
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
          <h2 className="text-2xl my-3">Khoá học chờ xác thực</h2>
          <Table
            pagination={{ pageSize: 5 }}
            columns={waiting_columns}
            dataSource={waitingData}
          />
          ;
        </div>
        <div className="approved_course">
          <h2 className="text-2xl my-3">Khoá học đã ghi danh</h2>
          <Table
            pagination={{ pageSize: 5 }}
            columns={approved_columns}
            dataSource={approvedData}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default ManagerUserRegister;