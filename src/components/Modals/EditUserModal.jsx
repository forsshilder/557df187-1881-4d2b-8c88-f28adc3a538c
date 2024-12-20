import React from "react";
import { Modal, Form, Input, Button } from "antd";

const EditUserModal = ({ visible, onCancel, onFinish, initialValues }) => (
  <Modal title="Edit User" visible={visible} onCancel={onCancel} footer={null}>
    <Form initialValues={initialValues} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="surname" label="Surname" rules={[{ required: true, message: "Surname is required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Phone number is required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ required: true, message: "Age info is required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="country" label="Country" rules={[{ required: true, message: "Country info required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="district" label="District" rules={[{ required: true, message: "District info required" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role required" }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Update User
      </Button>
    </Form>
  </Modal>
);

export default EditUserModal;
