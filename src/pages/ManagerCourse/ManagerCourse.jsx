import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { pathChildren } from "../../common/path";
import WithLoading from "../../component/WithLoading/WithLoading";
import { notiValidate } from "../../common/notiValidate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ManagerCourse = () => {
  const [courseValue, setCourseValue] = useState({});

  // cost [listCourse, setListCourse] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listCourse } = useSelector((state) => state.courseSlice);
  const { user } = useSelector((state) => state.authSlice);
  const { listCourseCategory } = useSelector((state) => state.courseSlice);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorImage, setErrorImage] = useState("");
  // const [dataLoaded, setDataLoaded] = useState(false);
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
  const showModal = (record) => {
    console.log(record);
    setCourseValue({
      maKhoaHoc: record.maKhoaHoc,
      biDanh: record.biDanh,
      tenKhoaHoc: record.tenKhoaHoc,
      moTa: record.moTa,
      luotXem: record.luotXem,
      danhGia: record.danhGia,
      hinhAnh: record.hinhAnh,
      maNhom: record.maNhom,
      ngayTao: record.ngayTao,
      maDanhMucKhoahoc: record.danhMucKhoaHoc?.maDanhMucKhoahoc,
      taiKhoan: record.nguoiTao?.taiKhoan,
    }),
      setIsModalOpen(true);
  };
  console.log(courseValue);
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
      taiKhoanNguoiTao: "",
      maDanhMucKhoaHoc: "",
    },
    onSubmit: (values) => {
      // values.taiKhoanNguoiTao = user.taiKhoan;
      // values.biDanh = values.tenKhoaHoc.toLowerCase().replace(/\s+/g, "-");
      let formData = new FormData();
      // values.maDanhMucKhoaHoc = values.maDanhMuc;
      // values.tenDanhMucKhoahoc = values.tenDanhMuc;

      if (values.hinhAnh instanceof File) {
        formData.append("File", values.hinhAnh);
      } else {
        formData.append("hinhAnh", values.hinhAnh);
      }

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        }
      }
      quanLyKhoaHocService
        .postCapNhatKhoaHoc(formData)
        .then((res) => {
          handleNotification("sửa thành công", "success");
          dispatch(getValueCourseAPI());
          //   handleReset();
          //   console.log(formData)
          if (res.data.hinhAnhUrl) {
            setImageUrl(res.data.hinhAnhUrl);
          }
          handleOk();
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data, "error");
        });
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
      //   hinhAnh: yup.string().nullable(),
      maNhom: yup.string().required(notiValidate.empty),
      ngayTao: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/,
          notiValidate.date
        ),

      maDanhMucKhoaHoc: yup.string().required(notiValidate.empty),
    }),
  });
  useEffect(() => {
    if (isModalOpen) {
      setValues({
        maKhoaHoc: courseValue.maKhoaHoc || "",
        biDanh: courseValue.biDanh || "",
        tenKhoaHoc: courseValue.tenKhoaHoc || "",
        moTa: courseValue.moTa || "",
        luotXem: courseValue.luotXem || 0,
        danhGia: courseValue.danhGia || 0,
        hinhAnh: courseValue.hinhAnh || "",
        maNhom: courseValue.maNhom || "GP01",
        ngayTao: courseValue.ngayTao || "",
        taiKhoanNguoiTao: courseValue.taiKhoan || "",
        maDanhMucKhoaHoc: courseValue.maDanhMucKhoahoc || "",
      });
      if (courseValue.hinhAnh) {
        setImageUrl(courseValue.hinhAnh);
      }
    }
  }, [isModalOpen, courseValue]);
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

  const handleOk = () => {
    setIsModalOpen(false);
    // handleSubmitEdit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const [isModalOpenEnroll, setIsModalOpenEnroll] = useState(false);
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
              key={courseValue.maKhoaHoc}
              title=" Chỉnh sửa khóa học"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              // footer={[
              //   <Button key="cancel" onClick={handleCancel}>
              //     Cancel
              //   </Button>
              // ]}
            >
              <form id="course-form" onSubmit={handleSubmit}>
                <div className="take-pic flex-col w-6/12 ">
                  <label className="font-sans text-base mb-5" htmlFor="">
                    Hình ảnh
                  </label>
                  <br />
                  {imageUrl && (
                    <div className="flex space-x-3">
                      <img className="w-2/3" src={imageUrl} alt="" />
                      <button
                        className="font-black top-0 text-xl right-28 mt-2 mr-2 text-red-500"
                        onClick={() => {
                          setImageUrl("");
                          setFieldValue("hinhAnh", "");
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        {/* xóa hình ảnh */}
                      </button>
                    </div>
                  )}
                  {!imageUrl && (
                    <input
                      name="hinhAnh"
                      className="mb-5 mt-2 font-sans text-base"
                      onChange={(event) => {
                        let urlImage = URL.createObjectURL(
                          event.target.files[0]
                        );
                        setImageUrl(urlImage);
                        if (event.target.files.length > 0) {
                          setFieldValue("hinhAnh", event.target.files[0]);
                        }
                      }}
                      type="file"
                    />
                  )}
                </div>

                <div className="flex flex-wrap">
                  <InputCustom
                    contentLabel={"Mã Khóa học"}
                    placeHolder={"Vui lòng nhập mã khóa học"}
                    classWrapper="w-1/2 p-3 "
                    name={"maKhoaHoc"}
                    value={values.maKhoaHoc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.maKhoaHoc}
                    errors={errors.maKhoaHoc}
                  />
                  <InputCustom
                    contentLabel={"Đánh Giá"}
                    placeHolder={"Vui lòng nhập Đánh Giá"}
                    classWrapper="w-1/2 p-3 "
                    name={"danhGia"}
                    value={values.danhGia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.danhGia}
                    errors={errors.danhGia}
                  />
                  <InputCustom
                    contentLabel={"Tên Khóa Học"}
                    placeHolder={"Vui lòng nhập Tên Khóa Học"}
                    classWrapper="w-1/2 p-3"
                    name={"tenKhoaHoc"}
                    value={values.tenKhoaHoc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.tenKhoaHoc}
                    errors={errors.tenKhoaHoc}
                  />
                  <InputCustom
                    contentLabel={"Bí Danh"}
                    placeHolder={"Vui lòng nhập Bí Danh"}
                    classWrapper="w-1/2 p-3"
                    name={"biDanh"}
                    value={values.biDanh}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.biDanh}
                    errors={errors.biDanh}
                  />

                  <div className="w-1/2 p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mã danh mục khóa học
                    </label>
                    <select
                      name="maDanhMucKhoaHoc"
                      value={values.maDanhMucKhoaHoc}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      onBlur={handleBlur}
                    >
                      <option> Vui lòng chọn mã danh mục khóa học</option>
                      {listCourseCategory.map((item, index) => (
                        <option value={item.maDanhMuc} key={index}>
                          {item.maDanhMuc}
                        </option>
                      ))}
                    </select>
                    {errors.maDanhMucKhoaHoc && touched.maDanhMucKhoaHoc && (
                      <p className="text-red-500 block">
                        {errors.maDanhMucKhoaHoc}
                      </p>
                    )}
                  </div>

                  <InputCustom
                    contentLabel={"Tài khoản người tạo"}
                    placeHolder={"Vui lòng nhập tài khoản người tạo"}
                    classWrapper="w-1/2 p-3 "
                    name={"taiKhoanNguoiTao"}
                    value={values.taiKhoanNguoiTao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={true}
                  />

                  <InputCustom
                    contentLabel={"Lượt xem"}
                    placeHolder={"Lượt xem"}
                    classWrapper="w-1/3 p-3"
                    name={"luotXem"}
                    value={values.luotXem}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.luotXem}
                    errors={errors.luotXem}
                  />

                  <InputCustom
                    contentLabel={"Ngày Tạo"}
                    placeHolder={"DD/MM/YYYY"}
                    classWrapper="w-1/3 p-3"
                    name={"ngayTao"}
                    value={values.ngayTao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // type="date"
                    touched={touched.ngayTao}
                    errors={errors.ngayTao}
                  />

                  <div className="w-1/3 p-3">
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
                      <option>Vui lòng chọn mã lớp</option>
                      {[
                        { gp01: "GP01" },
                        { gp02: "GP02" },
                        { gp03: "GP03" },
                        { gp04: "GP04" },
                        { gp05: "GP05" },
                      ].map((group, index) => (
                        <option value={Object.keys(group)[0]} key={index}>
                          {Object.values(group)[0]}
                        </option>
                      ))}
                    </select>
                    {errors.maNhom && touched.maNhom && (
                      <p className="text-red-500 block">{errors.maNhom}</p>
                    )}
                  </div>
                  <div className=" w-full p-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Mô tả khóa học
                    </label>
                    <textarea
                      className="p-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                      placeholder="Vui lòng nhập mô tả Khóa Học"
                      name={"moTa"}
                      value={values.moTa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onTouchCancel={touched}
                    ></textarea>
                    {errors && touched && (
                      <p className="text-red-500 block">{errors.moTa}</p>
                    )}
                  </div>

                  <div>
                    <button
                      className="px-5 py-2 bg-black text-white rounded"
                      type="submit"
                      // disabled={!isValid || isSubmitting}
                    >
                      Update Khóa Học
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
