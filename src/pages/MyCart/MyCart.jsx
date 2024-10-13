import React, { useState, useEffect } from "react";
import { Button, Flex, Table, Card, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeFromCart } from "../../redux/cartSlice";
import WithLoading from "../../component/WithLoading/WithLoading";

const MyCart = () => {
  const { cartItems } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));

    const updatedSelectedKeys = selectedRowKeys.filter(
      (key) => cartItems[key].maKhoaHoc !== courseId
    );
    setSelectedRowKeys(updatedSelectedKeys);
    calculateTotals(updatedSelectedKeys);
  };

  const columns = [
    {
      title: "Image Course",
      dataIndex: "image",
    },
    {
      title: "Name Course",
      dataIndex: "name",
    },

    {
      title: "Price Course",
      dataIndex: "price",
    },
    {
      title: "Remove",
      dataIndex: "remove",
    },
  ];

  const dataSource = cartItems.map((item, i) => ({
    key: i,
    image: (
      <img
        src={item.hinhAnh}
        alt={item.tenKhoaHoc}
        className="w-20 object-cover"
      />
    ),
    name: item.tenKhoaHoc,

    price: "$" + item.giaTien + ".00",
    remove: (
      <button
        className="text-red-500 text-xl"
        onClick={() => handleRemoveFromCart(item.maKhoaHoc)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    ),
  }));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    calculateTotals(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const calculateTotals = (keys) => {
    const selectedItems = keys.map((key) => cartItems[key]);
    // console.log(selectedItems);
    const newSubtotal = selectedItems.reduce(
      (acc, item) => acc + item.giaTien,
      0
    );
    setSubtotal(newSubtotal);

    const newAdditionalFees = keys.length * 1;
    setAdditionalFees(newAdditionalFees);

    setTotal(newSubtotal + newAdditionalFees);
  };

  const summaryColumns = [
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
  ];

  const summaryData = [
    {
      key: "1",
      description: "Course costs",
      amount: `$${subtotal}.00`,
    },
    {
      key: "2",
      description: "Additional fees",
      amount: `$${additionalFees}.00`,
    },
    {
      key: "3",
      description: "Total",
      amount: `$${total}.00`,
    },
  ];

  return (
    <>
      {" "}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <Flex gap="middle" vertical className="md:col-span-2">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />
        </Flex>

        <Space direction="vertical" size={16} className="md:col-span-1">
          <Card title="SubTotal" style={{ width: 300 }}>
            <Table
              columns={summaryColumns}
              dataSource={summaryData}
              pagination={false}
            />
            <div className="text-right my-3 ">
              <button className="btn btn-primary">Payment</button>
            </div>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default MyCart;
