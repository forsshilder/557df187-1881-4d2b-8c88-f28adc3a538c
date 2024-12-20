import React from "react";
import { Layout } from "antd";
import UserTable from "../../components/Table/UserTable";
import "./styles.css";

const { Header, Content, Footer } = Layout;

function HomePage() {
  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <a href="/tr" className="navbar-logo-link">
          <img alt="Navbar Logo" loading="lazy" width="129" height="30" decoding="async" src="https://www.usersdot.com/images/icons/navbar-logo.svg" />
        </a>
      </Header>
      <Content className="app-content">
        <h2>User Management Dashboard</h2>
        <UserTable />
      </Content>
      <Footer className="app-footer">Usersdot User Management System ©2024</Footer>
    </Layout>
  );
}

export default HomePage;
