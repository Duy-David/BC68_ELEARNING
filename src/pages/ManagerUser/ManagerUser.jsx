import React, { useContext, useEffect, useRef, useState } from "react";
import { Space, Table, Tag } from "antd";
import { http } from "../../service/config";
import { Button, Modal } from "antd";
import InputCustom from "../../component/Input/InputCustom";
import { Formik, useFormik } from "formik";
import { NotificationContext } from "../../App";
import * as yup from "yup";
import { notiValidate } from "../../common/notiValidate";
import { Navigate, useNavigate } from "react-router-dom";
import { pathChildren } from "../../common/path";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { removeVietnameseTones } from "../../util/util";

const ManagerUser = () => {
  const [userData, setUserData] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hideBtn, setHideBtn] = useState();
  const [newUserArr, setNewUserArr] = useState(false);
  const navigate = useNavigate();
  const [triggerSearch, setTriggerSearch] = useState(false);

  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const { handleNotification } = useContext(NotificationContext);

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
            onClick={() =>
              navigate(
                `${pathChildren.managerUserRegister.replace(
                  ":taiKhoan",
                  record.taiKhoan
                )}`
              )
            }
            className="text-white enrollBtn py-2 px-3 bg-blue-500 rounded-md font-bold hover:bg-blue-500/70"
          >
            Ghi Danh
          </button>
          <button
            onClick={() => handleDelete(record.taiKhoan)}
            className="text-white deleteBtn py-2 px-3 bg-red-500 rounded-md font-bold hover:bg-red-500/70"
          >
            Xoá
          </button>
          <button
            onClick={() => {
              handleEdit(record.taiKhoan);
              // setUpdateUser(true);
            }}
            className="text-white editBtn py-2 px-3 bg-orange-500 rounded-md font-bold hover:bg-orange-500/70"
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

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
      taiKhoan: yup
        .string()
        .required(notiValidate.empty)
        .min(3, notiValidate.min(3))
        .max(10, notiValidate.max(10)),
      email: yup
        .string()
        .required(notiValidate.empty)
        .email(notiValidate.email),
      matKhau: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^~`;,.()?&#])[A-Za-z\d@$!%*^~`;,.()?&#]{8,}$/,
          notiValidate.password
        ),
      hoTen: yup
        .string()
        .required(notiValidate.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, notiValidate.fullname),
      soDT: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/,
          notiValidate.phone
        ),
      maLoaiNguoiDung: yup.string().required(notiValidate.empty),
      maNhom: yup.string().required("Loại mã Nhóm như: GP01, GP02..."),
    }),
    onSubmit: (values) => {
      nguoiDungService
        .putThongTinNguoiDung(values, accessToken)
        .then((res) => {
          console.log(res);
          handleNotification("Cập nhật thành công!", "success");
          formik.resetForm();
          setNewUserArr(true);
          handleCancel();
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
    setIsDisable(false);
    setHideBtn(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // gọi data để render lên trang
  useEffect(() => {
    if (userData.length === 0 || newUserArr === true) {
      nguoiDungService
        .layDanhSachNguoiDung()
        .then((res) => {
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
          setNewUserArr(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData, newUserArr]);

  // Edit user infor
  const handleEdit = (taiKhoan) => {
    setIsDisable(true);
    nguoiDungService
      .timKiemNguoiDung(taiKhoan)
      .then((res) => {
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
        setHideBtn(true);
        console.log("userInfo", userInfo);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    setIsModalOpen(true);
  };
  console.log("formik.setValues", formik.values);

  // delete tài khoản
  const handleDelete = (taiKhoan) => {
    nguoiDungService
      .deleteUser(accessToken, taiKhoan)
      .then((res) => {
        handleNotification("Delete thành công!", "success");
        setNewUserArr(true);
      })
      .catch((error) => {
        handleNotification(`${error.response.data}`, "error");
      });
  };

  // handle Search
  const handleSearch = (e) => {
    let searchValue = e.target.value;
    setSearchText(removeVietnameseTones(searchValue?.toLowerCase().trim()));
    setTriggerSearch((prev) => !prev);
  };

  useEffect(() => {
    if (!searchText) return setUserData([]);

    const setTime = setTimeout(() => {
      nguoiDungService
        .timKiemNguoiDung(searchText)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(setTime);
  }, [searchText, triggerSearch]);

  // handle submit
  const handleUserCreate = () => {
    // Kiểm tra xem form có hợp lệ hay không
    if (!formik.isValid) {
      handleNotification("Vui lòng kiểm tra lại các trường nhập!", "error");
      return;
    }
    nguoiDungService
      .themNguoiDung(accessToken, formik.values)
      .then((res) => {
        handleNotification("Tạo mới thành công!", "success");
        formik.resetForm();
        setNewUserArr(true);
        handleCancel();
      })
      .catch((err) => {
        handleNotification(`${err.response.data}`, "error");
      });
  };

  return (
    <div className="user_manager">
      <div className="user_manager_head">
        <div className="user_manager_title">
          <div className="user_manager_title flex justify-between mb-5">
            <h1 className="font-bold text-4xl">Quản Lý Người Dùng</h1>
            <button
              onClick={() => {
                showModal();
                // setUpdateUser(false);
              }}
              className="bg-green-500 py-2 px-4 rounded-md text-white font-bold hover:bg-green-600"
            >
              Thêm Người Dùng
            </button>
          </div>
          <div className="user_manager_search flex justify-center items-center mb-3">
            <input
              className="w-2/3 border border-1 px-2 py-3 rounded-md mr-3"
              type="text"
              placeholder="Nhập tài khoản hoặc tên người dùng"
              onChange={handleSearch}
            />
            <button className=" bg-gray-500 py-2 px-4 text-white rounded-md font-bold hover:bg-gray-600 inline-block">
              Tìm Kiếm
            </button>
          </div>
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
          footer={null}
        >
          <form id="user-form" onSubmit={formik.handleSubmit}>
            <InputCustom
              contentLabel={"Tài Khoản"}
              placeHolder={"Nhập Tài Khoản"}
              name={"taiKhoan"}
              value={formik.values?.taiKhoan || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.taiKhoan}
              disabled={isDisable}
            />
            <InputCustom
              contentLabel={"Mật Khẩu"}
              placeHolder={"Nhập Mật Khẩu"}
              name={"matKhau"}
              type="password"
              value={formik.values?.matKhau || ""}
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
              value={formik.values?.hoTen || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.hoTen}
            />
            <InputCustom
              contentLabel={"Số Điện Thoại"}
              placeHolder={"Nhập Số Điện Thoại"}
              name={"soDT"}
              value={formik.values?.soDT || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.soDT}
            />
            <InputCustom
              contentLabel={"Email"}
              placeHolder={"Nhập Email"}
              name={"email"}
              value={formik.values?.email || ""}
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
              value={formik.values?.maNhom || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors?.maNhom}
            />

            <button
              onClick={handleUserCreate}
              type="button"
              hidden={hideBtn}
              className="bg-green-500 mr-3 py-2 px-4 mt-3 text-white rounded-md font-bold hover:bg-green-600"
            >
              Thêm Người Dùng
            </button>
            <button
              className="bg-orange-500 py-2 px-4 mt-3 text-white rounded-md font-bold hover:bg-orange-600"
              type="submit"
              hidden={!hideBtn}
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
