import React, { useContext, useEffect, useRef, useState } from "react";
import { Space, Table, Tag } from "antd";
import { http } from "../../service/config";
import { Button, Modal } from "antd";
import InputCustom from "../../component/Input/InputCustom";
import { Formik, useFormik } from "formik";
import { NotificationContext } from "../../App";
import * as yup from "yup";
// AntDesign Table
const columns = (handleDelete, handleEdit) => [
  {
    title: "Tài Khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
  },
  {
    title: "Họ Tên",
    dataIndex: "hoTen",
    key: "hoTen",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "soDT",
    key: "soDT",
  },
  {
    title: "Chức Vụ",
    key: "maLoaiNguoiDung",
    dataIndex: "maLoaiNguoiDung",
    render: (_, { maLoaiNguoiDung }) => (
      <>
        <Tag
          color={maLoaiNguoiDung == "GV" ? "geekblue" : "green"}
          key={maLoaiNguoiDung}
        >
          {maLoaiNguoiDung.toUpperCase()}
        </Tag>
      </>
    ),
  },
  {
    title: "Hành Động",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <button
          onClick={() => handleDelete(record.taiKhoan)}
          className="text-white deleteBtn py-2 px-3 bg-orange-500 rounded-md font-bold hover:bg-orange-600"
        >
          Xoá
        </button>
        <button
          onClick={() => handleEdit(record.taiKhoan)}
          className="text-white editBtn py-2 px-3 bg-blue-500 rounded-md font-bold hover:bg-blue-600"
        >
          Sửa
        </button>
      </Space>
    ),
  },
];

const ManagerUser = () => {
  const [userData, setUserData] = useState([]);
  // const [editData, setEditData] = useState([]);

  const { handleNotification } = useContext(NotificationContext);

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email")
        .required("Không được bỏ trống."),
      taiKhoan: yup
        .string()
        .required("Không được bỏ trống.")
        .min(4, "ít nhất 4 ký tự"),
      hoTen: yup
        .string()
        .required("Không được bỏ trống.")
        .min(6, "ít nhất 6 ký tự"),
      matKhau: yup
        .string()
        .required("Không được bỏ trống.")
        .min(6, "Ít nhất 6 ký tự.")
        .matches(/[A-Z]/, "Phải có ít nhất một ký tự viết hoa."),
      soDT: yup
        .string()
        .required("Không được bỏ trống.")
        .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 chữ số."),
      maLoaiNguoiDung: yup.string().required("Không được bỏ trống."),
      maNhom: yup.string().required("Loại mã Nhóm như: GP01, GP02..."),
    }),
    onSubmit: (values) => {
      console.log("formik values", formik.values);
      http
        .put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        })
        .then((res) => {
          console.log(res);
          handleNotification("Cập nhật thành công!", "success");
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
          handleNotification(`${err.response.data}`, "error");
        });
    },
  });

  // AntDesign Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    formik.resetForm();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // gọi data để render lên trang
  useEffect(() => {
    http
      .get("/QuanLyNguoiDung/LayDanhSachNguoiDung")
      .then((res) => {
        // console.log(res.data);
        let userArray = res.data.map((item, index) => {
          return {
            key: index,
            taiKhoan: item.taiKhoan,
            hoTen: item.hoTen,
            email: item.email,
            soDT: item.soDt,
            maLoaiNguoiDung: item.maLoaiNguoiDung,
          };
        });
        setUserData(userArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Edit user infor
  const handleEdit = (taiKhoan) => {
    console.log("taiKhoan", taiKhoan);
    http
      .get(`/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`)
      .then((res) => {
        console.log("res.data[0]", res.data[0]);
        // setEditData(res.data[0]);
        let userInfo = res.data[0];
        userInfo = {
          ...userInfo,
          soDT: userInfo.soDt,
        };

        delete userInfo.soDt;
        formik.setValues({
          ...formik.values,
          ...userInfo,
        });

        console.log("userInfo", userInfo);
        // console.log("editData", editData);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    setIsModalOpen(true);
  };

  // delete tài khoản
  const handleDelete = (taiKhoan) => {
    // console.log(JSON.parse(localStorage.getItem("user")));
    http
      .delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      })
      .then((res) => {
        console.log(res);
        handleNotification("Delete thành công!", "success");
      })
      .catch((error) => {
        console.log(error.response.data);
        handleNotification(`${error.response.data}`, "error");
      });
  };

  // handle submit
  const handleUserCreate = () => {
    console.log(formik.values);

    http
      .post("/QuanLyNguoiDung/ThemNguoiDung", formik.values, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      })
      .then((res) => {
        console.log(res);
        handleNotification("Tạo mới thành công!", "success");
        formik.resetForm();
      })
      .catch((err) => {
        console.log(err.response.data);
        handleNotification(`${err.response.data}`, "error");
      });
  };

  return (
    <div className="user_manager">
      <div className="container">
        <div className="user_manager_title flex justify-between mb-5">
          <h1 className="font-bold text-4xl">Quản Lý Người Dùng</h1>
          <button
            onClick={() => showModal()}
            className="bg-green-500 py-2 px-4 rounded-md text-white font-bold hover:bg-green-600"
          >
            Thêm Người Dùng
          </button>
        </div>
        <Table
          columns={columns(handleDelete, handleEdit)}
          dataSource={userData}
        />
        ;
      </div>
      <div className="modal">
        <Modal
          title="Thông Tin Người Dùng"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form id="user-form" onSubmit={formik.handleSubmit}>
            <InputCustom
              contentLabel={"Tài Khoản"}
              placeHolder={"Nhập Tài Khoản"}
              name={"taiKhoan"}
              value={formik.values?.taiKhoan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.taiKhoan}
            />
            <InputCustom
              contentLabel={"Mật Khẩu"}
              placeHolder={"Nhập Mật Khẩu"}
              name={"matKhau"}
              type="password"
              value={formik.values?.matKhau}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              enableShowPassBtn={true}
              errors={formik.errors?.matKhau}
            />
            <InputCustom
              contentLabel={"Họ Tên"}
              placeHolder={"Nhập Họ Tên"}
              name={"hoTen"}
              value={formik.values?.hoTen}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.hoTen}
            />
            <InputCustom
              contentLabel={"Số Điện Thoại"}
              placeHolder={"Nhập Số Điện Thoại"}
              name={"soDT"}
              value={formik.values?.soDT}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.soDT}
            />
            <InputCustom
              contentLabel={"Email"}
              placeHolder={"Nhập Email"}
              name={"email"}
              value={formik.values?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.email}
            />

            <div className="chuVu">
              <p className="text-md font-medium mb-2">Chọn Loại Người Dùng</p>
              <select
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 `}
                name={"maLoaiNguoiDung"}
                value={formik.values?.maLoaiNguoiDung}
                onChange={formik.handleChange}
              >
                <option value="">Chọn Chức Vụ</option>
                <option value="HV">Học Viên</option>
                <option value="GV">Giáo Viên</option>
              </select>
              <p className="text-red-500">
                {formik.errors.maLoaiNguoiDung
                  ? formik.errors.maLoaiNguoiDung
                  : null}
              </p>
            </div>

            <InputCustom
              contentLabel={"Nhóm Người Dùng"}
              placeHolder={"Nhập Mã Nhóm"}
              name={"maNhom"}
              value={formik.values?.maNhom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.maNhom}
            />

            <button
              onClick={handleUserCreate}
              type="button"
              className="bg-green-500 mr-3 py-2 px-4 mt-3 text-white rounded-md font-bold hover:bg-green-600"
            >
              Thêm Người Dùng
            </button>
            <button
              className="bg-blue-500 py-2 px-4 mt-3 text-white rounded-md font-bold hover:bg-blue-600"
              type="submit"
            >
              Cập Nhật
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ManagerUser;
