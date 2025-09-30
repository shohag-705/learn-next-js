"use client";
import { Space, Typography } from "antd";
import TreeSelectComponent from "../components/TreeSelectComponent";
import TransferComponent from "../components/TransferComponent";
export default function Shop() {
  return (
    <>
      <Typography.Title level={2}>Shop Page</Typography.Title>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <TreeSelectComponent />
        <TransferComponent />
      </Space>
    </>
  );
}
