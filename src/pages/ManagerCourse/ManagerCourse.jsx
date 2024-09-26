import React, { useContext, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { getValueCourseAPI } from "../../redux/courseSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import InputCustom from "../../component/Input/InputCustom";
import moment from "moment";

const ManagerCourse = () => {
  // const [listCourse, setListCourse] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listCourse } = useSelector((state) => state.courseSlice);
  const { user } = useSelector((state) => state.authSlice);
  const { listCourseCategory } = useSelector((state) => state.courseSlice);
  // console.log(user);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleResetform = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleResetform(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    handleSubmit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    setValues,
    handleReset,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      // danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      danhMucKhoaHoc: {
        maDanhMucKhoahoc: "",
      },
      nguoiTao: {
        taiKhoan: "",
      },
    },
    onSubmit: (value) => {
      console.log("Form submitted", value);
      const payload = {
        maKhoaHoc: value.maKhoaHoc,
        biDanh: value.biDanh,
        tenKhoaHoc: value.tenKhoaHoc,
        moTa: value.moTa,
        luotXem: value.luotXem,
        // danhGia: value.danhGia,
        hinhAnh: value.hinhAnh,
        maNhom: value.maNhom,
        ngayTao: value.ngayTao,
        maDanhMucKhoaHoc: value.danhMucKhoaHoc.maDanhMucKhoahoc,
        taiKhoanNguoiTao: value.nguoiTao.taiKhoan,
      };
      console.log(payload);
      quanLyKhoaHocService
        .putCapNhatKhoaHoc(payload)
        .then((res) => {
          console.log(res);
          handleNotification("Sữa dữ liệu thành công", "success");
          dispatch(getValueCourseAPI());
          setIsModalOpen(false);
          // resetForm();
        })
        .catch((err) => {
          console.log(err);
          // console.log(err.response.data.content);
          handleNotification(
            err.response.data.message || err.response.data.content,
            "error"
          );
        });
    },
    validationSchema: yup.object({
      tenKhoaHoc: yup.string().required("Vui lòng nhập tên khóa học"),
      // danhGia: yup.string().required("Vui lòng không được bỏ trống"),
      moTa: yup.string().required("Vui lòng không được bỏ trống"),
      biDanh: yup.string().required("Vui lòng không được bỏ trống"),
      maNhom: yup.number().required("Vui lòng không được bỏ trống"),
      luotXem: yup.number().required("Vui lòng không được bỏ trống"),
      biDanh: yup.string().required("Vui lòng không được bỏ trống"),
      maDanhMucKhoaHoc: yup.string().required("Vui lòng không được bỏ trống"),
      ngayTao: yup.string().required("Vui lòng không được bỏ trống"),
    }),
  });
  // const handleSubmitForm = () => {
   
  //   if (isValid) {
  //     setIsModalOpen(false);
  //     resetForm();
  //   }
    
  // };
  const columns = [
    {
      title: "Mã Khóa Học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      // width: '30%',
      ...getColumnSearchProps("maKhoaHoc"),
    },
    {
      title: "Tên Khóa Học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      // width: '20%',
      ...getColumnSearchProps("tenKhoaHoc"),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      // width: '20%',
      ...getColumnSearchProps("hinhAnh"),
      render: (text) => {
        return <img className="h-14" src={text} alt="" />;
      },
    },

    {
      title: "Lượt Xem",
      dataIndex: "luotXem",
      key: "luotXem",
      ...getColumnSearchProps("luotXem"),
      sorter: (a, b) => Number(a.luotXem) - Number(b.luotXem),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      ...getColumnSearchProps("hinhAnh"),
      render: (text) => {
        return <p>{text.hoTen}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log(record);
        return (
          <Space size="middle" className="space-x-1">
            <button className=" bg-green-500 text-white py-2 px-3 rounded-md duration-300 hover:bg-green-500/90 ">
              Ghi Danh
            </button>

            <button
              onClick={() => {
                quanLyKhoaHocService
                  .deleteKhoaHoc(record.maKhoaHoc, user.accessToken)
                  .then((res) => {
                    console.log(res);
                    handleNotification(res.data.message, "success");
                    dispatch(getValueCourseAPI());
                  })
                  .catch((err) => {
                    console.log(err);
                    handleNotification(err.response.data, "error");
                  });
              }}
              className=" bg-red-500 text-white py-2 px-5 rounded-md duration-300 hover:bg-red-500/90 "
            >
              Xóa{" "}
            </button>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setValues(record);
              }}
              className="bg-yellow-500 text-white py-2 px-5 rounded-md duration-300 hover:bg-yellow-500/90"
            >
              Sửa
            </button>
            <Modal
              // key={values.maKhoaHoc}
              title=" Chỉnh sửa khóa học"
              open={isModalOpen}
              onOk={handleOk} // Đây là nút OK
              onCancel={handleCancel}
            >
              <img src={values.hinhAnh} alt="" className="h-16" />
              <form id="course-form" 
              onSubmit={handleSubmit}
              >
                <div className="flex flex-wrap">
                  <InputCustom
                    contentLabel={"Mã Khóa Học"}
                    placeHolder={"Vui lòng nhập mã khóa học"}
                    classWrapper="w-1/3 p-3 "
                    name={"maKhoaHoc"}
                    value={values.maKhoaHoc}
                    disabled={true}
                    onChange={handleChange}
                  />
                  <InputCustom
                    contentLabel={"Tên Khóa Học"}
                    placeHolder={"Vui lòng nhập Tên Khóa Học"}
                    classWrapper="w-1/3 p-3"
                    name={"tenKhoaHoc"}
                    value={values.tenKhoaHoc}
                    onChange={handleChange}
                    errors={errors.tenKhoaHoc}
                    touched={touched.tenKhoaHoc}
                  />
                  <InputCustom
                    contentLabel={"Bí Danh"}
                    placeHolder={"Vui lòng nhập Bí Danh"}
                    classWrapper="w-1/3 p-3"
                    name={"biDanh"}
                    value={values.biDanh}
                    onChange={handleChange}
                    errors={errors.biDanh}
                    touched={touched.biDanh}
                  />

                  <div className="w-1/2 p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã danh mục khóa học
                    </label>
                    <select
                      name="danhMucKhoaHoc.maDanhMucKhoahoc"
                      value={values.danhMucKhoaHoc.maDanhMucKhoahoc}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      {listCourseCategory.map((item, index) => (
                        <option value={item.maDanhMuc} key={index}>
                          {item.maDanhMuc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <InputCustom
                    contentLabel={"Tài khoản người tạo"}
                    placeHolder={"Vui lòng nhập tài khoản người tạo"}
                    classWrapper="w-1/2 p-3 "
                    name={"nguoiTao.taiKhoan"}
                    value={values.nguoiTao.taiKhoan}
                    onChange={handleChange}
                    disabled={true}
                  />

                  <InputCustom
                    contentLabel={"Mô tả khóa học"}
                    placeHolder={"Vui lòng nhập mô tả"}
                    classWrapper="w-full p-3"
                    name={"moTa"}
                    value={values.moTa}
                    onChange={handleChange}
                    errors={errors.moTa}
                    touched={touched.moTa}
                  />
                  <InputCustom
                    contentLabel={"Lượt xem"}
                    placeHolder={"Lượt xem"}
                    classWrapper="w-1/3 p-3"
                    name={"luotXem"}
                    value={values.luotXem}
                    onChange={handleChange}
                    errors={errors.luotXem}
                    touched={touched.luotXem}
                  />
                  <div className="w-1/3 p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Ngày tạo
                    </label>
                    <DatePicker
                      onChange={(date, dateString) => {
                        setFieldValue("ngayTao", date); // Set the 'date' which is a moment object
                      }}
                      format="DD-MM-YYYY"
                      value={
                        values.ngayTao
                          ? moment(values.ngayTao, "DD-MM-YYYY")
                          : null
                      }
                      name="ngayTao"
                      className="p-2.5"
                    />
                  </div>

                  <div className="w-1/3 p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã nhóm
                    </label>
                    <select
                      name="maNhom"
                      value={values.maNhom}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="GP01">GP01</option>
                      <option value="GP02">GP02</option>
                      <option value="GP03">GP03</option>
                      <option value="GP04">GP04</option>
                      <option value="GP05">GP05</option>
                    </select>
                  </div>
                </div>
              </form>
            </Modal>
          </Space>
        );
      },
    },
  ];
  const handleCreateCourse = () => {
    console.log("helloworld");
  };
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold">Quản lý Khóa học </h2>
        <button
          onClick={handleCreateCourse}
          className="bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-500/90"
        >
          Thêm Khóa học{" "}
        </button>
      </div>

      <Table columns={columns} dataSource={listCourse} rowKey="maKhoaHoc" />
    </>
  );
};
export default ManagerCourse;
