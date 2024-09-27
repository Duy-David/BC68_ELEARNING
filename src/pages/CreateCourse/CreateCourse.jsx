import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputCustom from "../../component/Input/InputCustom";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import { getValueCourseAPI } from "../../redux/courseSlice";
import { pathChildren } from "../../common/path";
import { notiValidate } from "../../common/notiValidate";
import { useFormik } from "formik";
import * as yup from "yup";
import { NotificationContext } from "../../App";
const CreateCourse = () => {
  const { handleNotification } = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authSlice);
  const { listCourseCategory } = useSelector((state) => state.courseSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorImage, setErrorImage] = useState("");
  //   console.log(uploadImage)
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
  } = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
    //   hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: user.taiKhoan,
    },
    onSubmit: (value) => {
      console.log(value);
      const clonedValue = {
        ...value,
        hinhAnh: `${imageUrl}.png`|| "url đính kèm",
      }
    console.log(clonedValue)
      quanLyKhoaHocService
        .postThemKhoaHoc( user.accessToken, clonedValue)
        .then((res) => {
          console.log(res);
          handleNotification("Tạo khóa học thành công", "success");
          dispatch(getValueCourseAPI()); // Refresh the user list
          //   handleReset();
          console.log(formData)
          if (res.data.hinhAnhUrl) {
            setImageUrl(res.data.hinhAnhUrl);
          }
          setTimeout(() => {
            navigate(pathChildren.managerCourse);
          }, 2000);
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
      danhGia: yup.number().required(notiValidate.empty),
      hinhAnh: yup.string().nullable(),
      maNhom: yup.string().required(notiValidate.empty),
      ngayTao: yup
        .string()
        .required(notiValidate.empty)
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/,
          notiValidate.date
        ),

      //   maDanhMucKhoaHoc: yup.string().required(notiValidate.empty),
    }),
  });
  // console.log(errors);
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      if (image.size > 1024 * 1024 * 1) {
        setErrorImage("Hình vượt quá dung lượng cho phép");
        return;
      }
      setUploadImage(image); // Store the file for upload
      setImageUrl(URL.createObjectURL(image)); // Preview the image locally
      setErrorImage(""); // Clear error
    }
  };
  return (
    <>
      <form id="create-course-form" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold">THÊM KHÓA HỌC</h2>
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
              {listCourseCategory.map((item, index) => (
                <option value={item.maDanhMuc}>{item.maDanhMuc}</option>
              ))}
              {errors && touched && (
                <p className="text-red-500 block">{errors.maDanhMucKhoaHoc}</p>
              )}
            </select>
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
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
              <option value="GP03">GP03</option>
              <option value="GP04">GP04</option>
              <option value="GP05">GP05</option>
            </select>
            {errors && touched && (
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
          <div className="w-full p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Hình Ảnh
            </label>
            <input
              type="file"
              name="hinhAnh"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {errorImage && <p className="text-red-500">{errorImage}</p>}
          </div>
          {imageUrl && (
            <div className="w-full p-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Xem trước hình ảnh
              </label>
              <img
                src={imageUrl}
                alt="Preview"
                className="max-w-xs rounded-lg"
              />
            </div>
          )}

          <div>
            <button
              className="px-5 py-2 bg-black text-white rounded"
              type="submit"
              //   disabled={!isValid}
            >
              Tạo khóa Học
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCourse;
