/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import Spinner from "../components/layouts/Spinner";
import moment from "moment";
import Analytics from "../components/layouts/Analytics";
const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [Type, setType] = useState("All");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // Fetch all transactions
  {
    /*const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transactions/getTransaction", {
        userid: user._id,
        frequency,
        selectedDate,
        Type,
      });
      setLoading(false);
      setAllTransaction(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Fetch Issue with Transaction");
    }
  };*/
  }
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/getTransaction", {
        userid: user._id,
        frequency,
        selectedDate,
        Type,
      });
      setLoading(false);

      // Sort transactions by the Date field in descending order
      const sortedTransactions = res.data.sort(
        (a, b) => new Date(b.Date) - new Date(a.Date)
      );

      setAllTransaction(sortedTransactions);
      console.log(sortedTransactions);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Fetch Issue with Transaction");
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, [frequency, selectedDate, Type]);

  // Handle delete transaction
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/deleteTransaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted");
      getAllTransactions(); // Refresh transactions list
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete");
    }
  };

  // Handle add/edit transaction
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/editTransaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        getAllTransactions();
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/addTransaction", {
          ...values,
          userid: user._id,
        });
        getAllTransactions(); // Refresh transactions list
        message.success("Transaction Added Successfully");
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed To Add transaction");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
    },
    {
      title: "Type",
      dataIndex: "Type",
    },
    {
      title: "Category",
      dataIndex: "Category",
    },
    {
      title: "Description",
      dataIndex: "Description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={Type} onChange={(values) => setType(values)}>
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New{" "}
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="Amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="Type">
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="Category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Trading">Trading</Select.Option>
              <Select.Option value="Investment">Investment</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Fees">Fees</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="Date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Description" name="Description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
