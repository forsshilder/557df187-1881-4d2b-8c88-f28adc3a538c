import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal } from "antd";
import { getUsers, updateUser, saveUser, deleteUser } from "../../api/userApi";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchBar from "../SearchBar/SearchBar";
import EditUserModal from "../Modals/EditUserModal";
import AddUserModal from "../Modals/AddUserModal";
import "./styles.css";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [search, setSearch] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers(pagination);
  }, [search]);

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getUsers(params.current, params.pageSize, search);
      const { data: users, totalRows, currentPage, pageSize } = response.data;
      setData(users);
      setPagination({ current: currentPage, pageSize, total: totalRows });
    } catch (error) {
      notification.error({ message: "Error fetching users", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      await updateUser({ ...editingUser, ...values });
      notification.success({ message: "User updated successfully" });
      setIsEditModalVisible(false);
      fetchUsers(pagination);
    } catch (error) {
      notification.error({ message: "Error updating user", description: error.message });
    }
  };

  const handleAddUser = async (values) => {
    try {
      await saveUser(values);
      notification.success({ message: "User added successfully" });
      setIsAddModalVisible(false);
      fetchUsers(pagination);
    } catch (error) {
      notification.error({ message: "Error adding user", description: error.message });
    }
  };

  const handleDelete = async (userId) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteUser(userId);
          notification.success({ message: "User deleted successfully" });
          fetchUsers(pagination);
        } catch (error) {
          notification.error({ message: "Error deleting user", description: error.message });
        }
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Surname", dataIndex: "surname", key: "surname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "District", dataIndex: "district", key: "district" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Created At", dataIndex: "createdat", key: "createdat" },
    { title: "Updated At", dataIndex: "updatedat", key: "updatedat" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button className="edit-button" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </>
      ),
    },
  ];

  const tablePagination = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    showSizeChanger: true,
    onChange: (page, pageSize) => fetchUsers({ current: page, pageSize }),
  };

  return (
    <div>
      <div className="search-section" >
        <SearchBar onSearch={setSearch} />
        <Button className="button-section" type="primary" onClick={() => setIsAddModalVisible(true)}>
          Add User
        </Button>
      </div>

      <Table rowKey="id" dataSource={data} columns={columns} loading={loading} pagination={tablePagination} />

      <EditUserModal visible={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} onFinish={handleUpdate} initialValues={editingUser} />

      <AddUserModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} onFinish={handleAddUser} />
    </div>
  );
};

export default UserTable;
