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
import { useNavigate } from "react-router-dom";
import { pathChildren } from "../../common/path";

const ManagerCourse = () => {
  const [courseValue, setCourseValue] = useState({
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    // danhGia: 0,
    hinhAnh: "",
    maNhom: "",
    ngayTao: "",
    maDanhMucKhoahoc: "",
    taiKhoan: "",
  });

<<<<<<< Updated upstream
  // const [listCourse, setListCourse] = useState([]);
=======
  // cost [listCourse, setListCourse] = useState([]);
>>>>>>> Stashed changes
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listCourse } = useSelector((state) => state.courseSlice);
  const { user } = useSelector((state) => state.authSlice);
  const { listCourseCategory } = useSelector((state) => state.courseSlice);
  const navigate = useNavigate();
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

  const showModal = (record) => {
    setCourseValue({
      maKhoaHoc: record.maKhoaHoc,
      biDanh: record.biDanh,
      tenKhoaHoc: record.tenKhoaHoc,
      moTa: record.moTa,
      luotXem: record.luotXem,
      // danhGia: record.danhGia,
      hinhAnh: record.hinhAnh,
      maNhom: record.maNhom,
      ngayTao: record.ngayTao,
      // danhMucKhoaHoc: {
      maDanhMucKhoahoc: record.danhMucKhoaHoc?.maDanhMucKhoahoc, // Safe access with default
      // },
      // nguoiTao: {
      taiKhoan: record.nguoiTao?.taiKhoan, // Safe access with default
      // },
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    quanLyKhoaHocService
      .putCapNhatKhoaHoc(courseValue)
      .then((res) => {
        console.log(res);
        handleNotification("Sữa dữ liệu thành công", "success");
        dispatch(getValueCourseAPI());
        // setIsModalOpen(false);
        // resetForm();
      })
      .catch((err) => {
        console.log(err);
        handleNotification(err.response.data, "error");
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseValue({ ...courseValue, [name]: value });
  };
  const [isModalOpenEnroll, setIsModalOpenEnroll] = useState(false);
  const [courseEnroll, setCourseEnroll] = useState({
    maKhoaHoc: "",
    taiKhoan: "",
  });
  const showModalEnrroll = (record) => {
    setCourseEnroll({
      maKhoaHoc: record.maKhoaHoc,
      taiKhoan: record.taiKhoan,
    });
    setIsModalOpenEnroll(true);
  };

  const handleOkEnroll = () => {
    setIsModalOpenEnroll(false);
  };
  const handleCancelEnroll = () => {
    setIsModalOpenEnroll(false);
  };

  const formikEnroll = useFormik({
    initialValues: {
      maKhoaHoc: courseEnroll.maKhoaHoc,
      taiKhoan: courseEnroll.taiKhoan,
    },
    onSubmit: (values) => {
      quanLyKhoaHocService
        .postGhiDanhKhoaHoc(user.accessToken, values)
        .then((res) => {
          handleNotification("Ghi danh thành công", "success");
          setIsModalOpenEnroll(false);
          dispatch(getValueCourseAPI());
        })
        .catch((err) => {
          handleNotification(err.response.data, "error");
        });
    },
  });
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
      ...getColumnSearchProps("nguoiTao"),
      render: (text) => {
        return <p>{text.taiKhoan}</p>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      ...getColumnSearchProps("ngayTao"),
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log(record);
        return (
          <Space size="middle" className="">
            <button
<<<<<<< Updated upstream
              className="bg-green-500 text-white py-2 px-3  rounded-md duration-300 hover:bg-green-500/80 "
              onClick={() => showModalEnrroll(record)}
=======
              className="bg-green-500 text-white py-2 px-2  rounded-md duration-300 hover:bg-green-500/80 "
              onClick={() =>
                navigate(`/admin/ghi-danh-khoa-hoc/${record.maKhoaHoc}`)
              }
>>>>>>> Stashed changes
            >
              Ghi Danh
            </button>
            <Modal
              title="GHI DANH KHOA HỌC"
              open={isModalOpenEnroll}
              onOk={handleOkEnroll}
              onCancel={() => setIsModalOpenEnroll(false)}
              footer={null}
            >
              <form
                id="enroll-course-form"
                onSubmit={formikEnroll.handleSubmit}
                onReset={formikEnroll.onReset}
              >
                <InputCustom
                  contentLabel="Mã Khóa Học"
                  value={formikEnroll.values.maKhoaHoc}
                  name="maKhoaHoc"
                  onChange={formikEnroll.handleChange}
                  // disabled
                />
                <InputCustom
                  contentLabel="Tài khoản"
                  name="taiKhoan"
                  onChange={formikEnroll.handleChange}
                  value={formikEnroll.values.taiKhoan}
                />

                <button type="submit" className="my-6 bg-blue-700 hover:bg-blue-700/80 px-5 py-2 rounded-lg text-white">
                  Ghi Danh
                </button>
               
              </form>
            </Modal>
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
              onClick={() => showModal(record)}
              className="bg-yellow-500 text-white py-2 px-5 rounded-md duration-300 hover:bg-yellow-500/90"
            >
              Sửa
            </button>

            <Modal
              key={courseValue.maKhoaHoc}
              title=" Chỉnh sửa khóa học"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              // footer={[]}
            >
              <form id="course-form" onSubmit={handleSubmit}>
                <img src={courseValue.hinhAnh} alt="" className="h-16" />
                <div className="flex flex-wrap">
                  <InputCustom
                    contentLabel={"Mã Khóa Học"}
                    placeHolder={"Vui lòng nhập mã khóa học"}
                    classWrapper="w-1/3 p-3 "
                    name={"maKhoaHoc"}
                    value={courseValue.maKhoaHoc}
                    disabled={true}
                    onChange={handleChange}
                  />
                  <InputCustom
                    contentLabel={"Tên Khóa Học"}
                    placeHolder={"Vui lòng nhập Tên Khóa Học"}
                    classWrapper="w-1/3 p-3"
                    name={"tenKhoaHoc"}
                    value={courseValue.tenKhoaHoc}
                    onChange={handleChange}
                  />
                  <InputCustom
                    contentLabel={"Bí Danh"}
                    placeHolder={"Vui lòng nhập Bí Danh"}
                    classWrapper="w-1/3 p-3"
                    name={"biDanh"}
                    value={courseValue.biDanh}
                    onChange={handleChange}
                  />

                  <div className="w-1/2 p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã danh mục khóa học
                    </label>
                    <select
                      name="maDanhMucKhoahoc"
                      // name="danhMucKhoaHoc.maDanhMucKhoahoc"
                      // value={courseValue.danhMucKhoaHoc.maDanhMucKhoahoc}
                      value={courseValue.maDanhMucKhoahoc}
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
                    name={"taiKhoan"}
                    // name={"nguoiTao.taiKhoan"}
                    // value={courseValue.nguoiTao.taiKhoan}
                    value={courseValue.taiKhoan}
                    onChange={handleChange}
                    disabled={true}
                  />

                  <InputCustom
                    contentLabel={"Mô tả khóa học"}
                    placeHolder={"Vui lòng nhập mô tả"}
                    classWrapper="w-full p-3"
                    name={"moTa"}
                    value={courseValue.moTa}
                    onChange={handleChange}
                  />
                  <InputCustom
                    contentLabel={"Lượt xem"}
                    placeHolder={"Lượt xem"}
                    classWrapper="w-1/3 p-3"
                    name={"luotXem"}
                    value={courseValue.luotXem}
                    onChange={handleChange}
                  />

                  <InputCustom
                    contentLabel={"Ngày Tạo"}
                    // placeHolder={"Ngày tạo"}
                    classWrapper="w-1/3 p-3"
                    name={"ngayTao"}
                    value={courseValue.ngayTao}
                    onChange={handleChange}
                    // type="date"
                  />

                  <div className="w-1/3 p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã nhóm
                    </label>
                    <select
                      name="maNhom"
                      value={courseValue.maNhom}
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
                  <div>
                    <button
                      className="px-5 py-2 bg-black text-white rounded"
                      type="submit"
                    >
                      Update khóa Học
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold">Quản lý Khóa học </h2>
        <button
          onClick={() => navigate(pathChildren.createCourse)}
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
