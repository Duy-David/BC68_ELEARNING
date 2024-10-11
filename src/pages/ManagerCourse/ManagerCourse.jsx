import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { getValueCourseAPI, setListCourse } from "../../redux/courseSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import InputCustom from "../../component/Input/InputCustom";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { pathChildren } from "../../common/path";
import WithLoading from "../../component/WithLoading/WithLoading";
import { notiValidate } from "../../common/notiValidate";

const ManagerCourse = () => {
  // const [courseValue, setCourseValue] = useState({
  //   maKhoaHoc: "",
  //   biDanh: "",
  //   tenKhoaHoc: "",
  //   moTa: "",
  //   luotXem: 0,
  //   danhGia: 0,
  //   hinhAnh: "",
  //   maNhom: "",
  //   ngayTao: "",
  //   maDanhMucKhoahoc: "",
  //   taiKhoanNguoiTao: "",
  // });

  const [listCourse, setListCourse] = useState([]);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();

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

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    setValues,
    handleReset,
    errors,
    touched, //true,false
    handleBlur,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      maDanhMucKhoahoc: "",
      taiKhoanNguoiTao: "",
    },
    validationSchema: yup.object({
      maKhoaHoc: yup.string().required(notiValidate.empty),
      biDanh: yup.string().required(notiValidate.empty),
      tenKhoaHoc: yup.string().required(notiValidate.empty),
      moTa: yup.string().required(notiValidate.empty),
      luotXem: yup.number().required(notiValidate.empty),
      danhGia: yup
        .number()
        .required(notiValidate.empty)
        .max(100, "Tối đa là 100"),
      // //   hinhAnh: yup.string().nullable(),
      ngayTao: yup
        .string()
        .required(notiValidate.empty)
        .test(
          "is-date-correct",
          "Ngày không hợp lệ. Định dạng phải là DD/MM/YYYY",
          (value) => moment(value, "DD/MM/YYYY", true).isValid()
        ),
    }),
    onSubmit: (values) => {
      quanLyKhoaHocService
        .putCapNhatKhoaHoc(values)
        .then((res) => {
          let values = res.data;
          let formData = new FormData();
          if (uploadImage) {
            formData.append("File", uploadImage);
          }
          // console.log(values);
          for (let key in values) {
            if (key !== "hinhAnh" || uploadImage) {
              // Chỉ thêm 'hinhAnh' nếu có upload
              formData.append(key, values[key]);
            }
          }
          console.log(formData);
          quanLyKhoaHocService
            .postCapNhatKhoaHoc(formData)
            .then((res2) => {
              console.log("res2", res2);
              handleNotification("Sửa dữ liệu thành công", "success");
            })
            .catch((err2) => {
              console.log(err2);
              handleNotification(err2.response.data, "error");
            });

          // putCapNhat...
          console.log(res.data);
          // handleNotification("Sửa dữ liệu thành công", "success");
          setIsModalOpen(false);
          setImageUrl(null);
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data, "error");
          setImageUrl(null);
        });
    },
  });

  const showModal = (record) => {
    setValues({
      maKhoaHoc: record.maKhoaHoc,
      biDanh: record.biDanh,
      tenKhoaHoc: record.tenKhoaHoc,
      moTa: record.moTa,
      luotXem: record.luotXem,
      danhGia: record.danhGia || 0,
      hinhAnh: record.hinhAnh || "",
      maNhom: record.maNhom,
      ngayTao: record.ngayTao,
      maDanhMucKhoahoc: record.danhMucKhoaHoc?.maDanhMucKhoahoc,
      taiKhoanNguoiTao: record.nguoiTao?.taiKhoan,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getAllKhoaHoc = () => {
    quanLyKhoaHocService
      .layDanhSachKhoaHoc("")
      .then((res) => {
        // console.log("response in get all khoa hoc: ", res);
        dispatch(setListCourse(res.data));
      })
      .catch((err) => {
        // console.log("error in get all khoa hoc: ", err);
      });
  };
  console.log(isModalOpen);
  useEffect(() => {
    getAllKhoaHoc();
  }, [isModalOpen]);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      if (image.size > 1024 * 1024 * 1) {
        setErrorImage("Hình vượt quá dung lượng cho phép");
        setUploadImage(null);
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      setFieldValue("hinhAnh", e.target.files[0].name);
      setUploadImage(image); // Store the file for upload
      setImageUrl(URL.createObjectURL(image)); // Preview the image locally
      setErrorImage(""); // Clear error
    }
  };

  const columns = [
    {
      title: "Mã Khóa Học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      // width: '30%',
      ...getColumnSearchProps("maKhoaHoc"),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      // ...getColumnSearchProps("ngayTao"),
      render: (_, record) => {
        return <img src={record.hinhAnh} alt="Null" className="w-20" />;
      },
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
      title: "Hành Động",
      key: "action",
      render: (_, record) => {
        // console.log(record);
        return (
          <Space size="small" className="">
            <button
              className="bg-green-500 text-white py-2 px-2  rounded-md duration-300 hover:bg-green-500/80 "
              onClick={() =>
                navigate(`/admin/ghi-danh-khoa-hoc/${record.maKhoaHoc}`)
              }
            >
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
              className=" bg-red-500 text-white py-2 px-4 rounded-md duration-300 hover:bg-red-500/90 "
            >
              Xóa{" "}
            </button>
            <button
              onClick={() => showModal(record)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md duration-300 hover:bg-yellow-500/90"
            >
              Sửa
            </button>

            <Modal
              key={values.maKhoaHoc}
              title=" Chỉnh sửa khóa học"
              open={isModalOpen}
              // onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
              destroyOnClose={true}
              afterClose={handleReset}
            >
              <form id="course-form" onSubmit={handleSubmit}>
                <div className="w-full p-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Hình Ảnh
                  </label>
                  <input
                    // value={imageUrl}
                    type="file"
                    name="hinhAnh"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  {errorImage && <p className="text-red-500">{errorImage}</p>}
                </div>
                {imageUrl ? (
                  <div className="flex">
                    <img className="w-2/3" src={imageUrl} alt="" />
                    <button
                      className=" font-black text-5xl mt-2 mr-2 text-red-500"
                      onClick={() => {
                        setImageUrl("");
                        setFieldValue("hinhAnh", "");
                      }}
                    >
                      xóa{" "}
                    </button>
                  </div>
                ) : (
                  <img className="w-2/3" src={values.hinhAnh} alt="" />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <InputCustom
                    contentLabel={"Mã Khóa Học"}
                    // placeHolder={"Vui lòng nhập mã khóa học"}
                    // classWrapper="w-1/3  "
                    name={"maKhoaHoc"}
                    value={values.maKhoaHoc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.maKhoaHoc}
                    errors={errors.maKhoaHoc}
                    // disabled={true}
                  />
                  <InputCustom
                    contentLabel={"Tên Khóa Học"}
                    // placeHolder={"Vui lòng nhập Tên Khóa Học"}
                    // classWrapper="w-1/3 "
                    name={"tenKhoaHoc"}
                    value={values.tenKhoaHoc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.tenKhoaHoc}
                    errors={errors.tenKhoaHoc}
                  />
                  <InputCustom
                    contentLabel={"Bí Danh"}
                    // placeHolder={"Vui lòng nhập Bí Danh"}
                    // classWrapper="w-1/3 "
                    name={"biDanh"}
                    value={values.biDanh}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.biDanh}
                    errors={errors.biDanh}
                  />
                  <InputCustom
                    contentLabel={"Đánh Giá"}
                    // placeHolder={"Vui lòng nhập Bí Danh"}
                    // classWrapper="w-1/3 "
                    name={"danhGia"}
                    value={values.danhGia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.danhGia}
                    errors={errors.danhGia}
                  />
                  <div className=" ">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã danh mục khóa học
                    </label>
                    <select
                      name="maDanhMucKhoahoc"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value={values.maDanhMucKhoahoc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {listCourseCategory.map((item, index) => (
                        <option value={item.maDanhMuc} key={index}>
                          {item.maDanhMuc}
                        </option>
                      ))}
                    </select>
                    {errors.maDanhMucKhoahoc && touched.maDanhMucKhoahoc && (
                      <p className="text-red-500 block">
                        {errors.maDanhMucKhoahoc}
                      </p>
                    )}
                  </div>

                  <InputCustom
                    contentLabel={"Tài khoản người tạo"}
                    // placeHolder={"Vui lòng nhập tài khoản người tạo"}
                    // classWrapper="w-1/2  "
                    name={"taiKhoanNguoiTao"}
                    value={values.taiKhoanNguoiTao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={true}
                  />

                  <InputCustom
                    contentLabel={"Mô tả khóa học"}
                    // placeHolder={"Vui lòng nhập mô tả"}
                    // classWrapper="w-full "
                    name={"moTa"}
                    value={values.moTa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.moTa}
                    errors={errors.moTa}
                  />
                  <InputCustom
                    contentLabel={"Lượt xem"}
                    // placeHolder={"Lượt xem"}
                    // classWrapper="w-1/3 "
                    name={"luotXem"}
                    value={values.luotXem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.luotXem}
                    errors={errors.luotXem}
                  />

                  <InputCustom
                    contentLabel={"Ngày Tạo"}
                    // placeHolder={"Ngày tạo"}
                    // classWrapper="w-1/3 "
                    name={"ngayTao"}
                    value={values.ngayTao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // type="date"
                    touched={touched.ngayTao}
                    errors={errors.ngayTao}
                  />

                  <div className=" ">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã nhóm
                    </label>
                    <select
                      name="maNhom"
                      value={values.maNhom}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="GP01">GP01</option>
                      <option value="GP02">GP02</option>
                      <option value="GP03">GP03</option>
                      <option value="GP04">GP04</option>
                      <option value="GP05">GP05</option>
                    </select>
                    {errors.maNhom && touched.maNhom && (
                      <p className="text-red-500 block">{errors.maNhom}</p>
                    )}
                  </div>

                  <div className="flex items-end justify-center mt-5">
                    <button
                      className="px-4 py-2 bg-black text-white rounded-lg"
                      type="submit"
                      // onClick={handleSubmit}
                    >
                      Update thông tin khóa học
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
    <WithLoading>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold">Quản lý Khóa học </h2>
        <button
          onClick={() => navigate(pathChildren.createCourse)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-500/90"
        >
          Thêm Khóa học{" "}
        </button>
      </div>

      <Table columns={columns} dataSource={listCourse} rowKey="maKhoaHoc" />
    </WithLoading>
  );
};
export default ManagerCourse;
