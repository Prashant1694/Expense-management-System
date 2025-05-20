import React, { useState, useEffect } from "react";
import {
  Input,
  Modal,
  Form,
  Select,
  message,
  Table,
  DatePicker,
  InputNumber,
  Button,
  Popconfirm,
  notification,
} from "antd";
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
  const [frequency, setFrequency] = useState("All");
  const [selectedDate, setSelectedDate] = useState([]);
  const [Type, setType] = useState("All");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        "https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/getTransaction",
        {
          userid: user._id,
          frequency,
          selectedDate,
          Type,
        }
      );
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

  const { confirm } = Modal;

  const handleDelete = (record) => {
    confirm({
      title: "Are you sure you want to delete this transaction?",
      content: "This action can be undone within 5 seconds.",
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk() {
        const transactionId = record._id;
        setAllTransaction((prev) =>
          prev.filter((txn) => txn._id !== transactionId)
        );
        let undo = false;
        notification.open({
          message: "Transaction Deleted",
          description: "You can undo this action within 5 seconds.",
          duration: 5,
          btn: (
            <Button
              type="link"
              onClick={() => {
                undo = true;
                notification.destroy();
                setAllTransaction((prev) => [record, ...prev]);
                message.success("Deletion undone");
              }}
            >
              Undo
            </Button>
          ),
          onClose: async () => {
            if (!undo) {
              try {
                await axios.post(
                  "https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/deleteTransaction",
                  { transactionId }
                );
                message.success("Transaction deleted permanently");
              } catch (err) {
                message.error("Failed to delete transaction");
              }
            }
          },
        });
      },
      onCancel() {
        message.info("Deletion canceled");
      },
    });
  };
  const [userCategories, setUserCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(
        `https://expense-management-system-backend-t2f3.onrender.com/api/v1/categories/${user._id}`
      );
      setUserCategories(res.data.categories);
    } catch (error) {
      message.error("Failed to load categories");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      if (editable) {
        await axios.post(
          "https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/editTransaction",
          {
            ...values,
            userId: user._id,
            transactionId: selectedTransaction._id,
          }
        );
        message.success("Transaction Updated");
      } else {
        await axios.post(
          "https://expense-management-system-backend-t2f3.onrender.com/api/v1/transactions/addTransaction",
          {
            ...values,
            userId: user._id,
          }
        );
        message.success("Transaction Added");
      }
      form.resetFields();
      setEditable(false);
      setSelectedTransaction(null);
      setShowModal(false);
      await getAllTransactions();
      fetchCategories();
    } catch (error) {
      message.error("Something went wrong");
    }
  };
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
        <div style={{ display: "flex", gap: "12px" }}>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            style={{ cursor: "pointer", color: "#1890ff" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}
      <div style={{}}>
        <div
          className="filters"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ minWidth: "200px" }}>
            <label>
              <strong>Select Frequency</strong>
            </label>
            <Select
              value={frequency}
              onChange={(value) => setFrequency(value)}
              style={{ width: "100%" }}
            >
              <Select.Option value="All">All Transactions</Select.Option>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(value) => setSelectedDate(value)}
                style={{ width: "100%", marginTop: "8px" }}
              />
            )}
          </div>

          <div style={{ minWidth: "200px" }}>
            <label>
              <strong>Select Type</strong>
            </label>
            <Select
              value={Type}
              onChange={(value) => setType(value)}
              style={{ width: "100%" }}
            >
              <Select.Option value="All">All</Select.Option>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <UnorderedListOutlined
              className={viewData === "table" ? "active-icon" : ""}
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={viewData === "analytics" ? "active-icon" : ""}
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => setViewData("analytics")}
            />
          </div>

          <Button type="primary" onClick={() => setShowModal(true)}>
            + Add Transaction
          </Button>
        </div>

        <div className="content">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTransaction} rowKey="_id" />
          ) : (
            <Analytics allTransaction={allTransaction} />
          )}
        </div>
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
        }}
        footer={null}
        centered
        destroyOnClose
        bodyStyle={{ padding: "35px" }} // clean, consistent padding
        width={500}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={
            editable
              ? {
                  ...editable,
                  Date: moment(editable.Date),
                }
              : {}
          }
        >
          <Form.Item
            label="Amount"
            name="Amount"
            rules={[{ required: true, message: "Please enter an amount" }]}
          >
            <InputNumber
              placeholder="Enter amount"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="Type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select type">
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="Category"
            rules={[
              { required: true, message: "Please select or add a category" },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Select or type to add category"
              style={{ width: "100%" }}
              tokenSeparators={[","]}
              value={categoryValue}
              onChange={(value) => setCategoryValue(value)}
            >
              {userCategories.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
            rules={[{ required: true, message: "Please pick a date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[{ message: "Please enter a description" }]}
          >
            <Input placeholder="Optional" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              {editable ? "Update Transaction" : "Add Transaction"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;