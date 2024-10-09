import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../component/Input/InputCustom";
import { Select } from "antd";
import { Space, Table, Tag } from "antd";
import { http } from "../../service/config";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../App";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";

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

  const { handleNotification } = useContext(NotificationContext);

  // Lấy taiKhoan user
  const { taiKhoan } = useParams();

  // Lấy mã khoá học
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setMaKhoaHoc(value);
  };

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

  return (
    <div className="manager_user_register">
      <div className="container">
        <div
          className="manager_user_select_course justify-center flex pb-20"
          style={{ borderBottom: "1px solid black" }}
        >
          <Select
            // mode="tags"
            style={{
              width: "70%",
              height: "43px",
            }}
            placeholder="Chọn Khoá Học Ghi Danh"
            onChange={handleChange}
            options={options}
          />

          <div className="user_course_register px-2 py-2 ml-3 bg-blue-500 text-white font-bold rounded-md ">
            <button onClick={handleRegister}>Ghi Danh</button>
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
