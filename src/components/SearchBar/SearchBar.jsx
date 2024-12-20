import React from "react";
import { Input } from "antd";
import "./styles.css";

const SearchBar = ({ onSearch }) => {
  return <Input.Search className="search-bar" placeholder="Search by name or email" allowClear onSearch={onSearch} />;
};

export default SearchBar;
