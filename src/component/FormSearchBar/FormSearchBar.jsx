import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../Input/InputCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { quanLyKhoaHocService } from "../../service/quanLyKhoaHoc.service";
import useDebounce from "../../hooks/useDebounce";
import { NotificationContext } from "../../App";
import { pathDefault } from "../../common/path";
import { FrownOutlined } from "@ant-design/icons";

const FormSearchBar = () => {
  const [valueSearch, setValueSearch] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const debounceValue = useDebounce(valueSearch, 1000);
  const [listCourseSuggest, setListCourseSuggest] = useState([]);
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  // tìm khóa học
  // console.log("keywor==>", valueSearch ? true : false);
  useEffect(() => {
    // có nhập keywork mới cho chạy tìm kiếm
    if (valueSearch.length > 0) {
      quanLyKhoaHocService
        .searchKhoaHocTheoTen(valueSearch)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            const newListCourseSuggest = res.data
              .slice(0, 6)
              .map((item, index) => {
                return {
                  key: index,
                  label: (
                    <Link
                      to={`/course-catelogies/detail-course/${item.maKhoaHoc}`}
                      className="flex items-center space-x-4"
                    >
                      <img src={item.hinhAnh} className="w-20" alt="" />
                      <div>
                        <h4>{item.tenKhoaHoc}</h4>
                        <p>Danh mục: {item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
                      </div>
                    </Link>
                  ),
                };
              });
            setListCourseSuggest(newListCourseSuggest);
          } else {
            setListCourseSuggest([
              {
                key: "no-data",
                label: (
                  <div style={{ textAlign: "center" }}>
                    <FrownOutlined style={{ fontSize: 20 }} />
                    <p>No matching courses found</p>
                  </div>
                ),
                disabled: true,
              },
            ]);
          }

          setOpenDropDown(true);
        })
        .catch((err) => {
          console.log(err);
          setListCourseSuggest([
            {
              key: "no-data",
              label: (
                <div style={{ textAlign: "center" }}>
                  <FrownOutlined style={{ fontSize: 20 }} />
                  <p>No matching courses found</p>
                </div>
              ),
              disabled: true,
            },
          ]);

          setOpenDropDown(true);
        });
    }
  }, [debounceValue]);
  const handleOnChange = (e) => {
    setValueSearch(e.target.value);
    if (!e.target.value) {
      setOpenDropDown(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valueSearch.length > 0) {
      navigate(`${pathDefault.searchCourse}?tenKhoaHoc=${valueSearch}`);
      setValueSearch([]);
      setOpenDropDown(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="form_search relative"
      >
        <Dropdown
          overlayClassName="dropSearchSuggest"
          open={openDropDown}
          menu={{
            items: listCourseSuggest,
          }}
        >
          <div className="mb-2">
            <InputCustom
              placeHolder={"Search a course..."}
              classWrapper="inputWrapper"
              onChange={handleOnChange}
              value={valueSearch}
              type="search"
            />
            <button type="submit" className="serach_btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Dropdown>
      </form>
    </>
  );
};

export default FormSearchBar;
