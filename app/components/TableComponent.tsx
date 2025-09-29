"use client";
import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Button, notification } from "antd";
import NotificationComponent from "./NotificationComponent";
import { Alert } from "antd";
import ModalComponent from "./ModalComponent";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function TableComponent() {
  const [visible, setVisible] = useState(false);
  const [alertContent, setAlertContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAlert = (name: string) => {
    console.log("first", name);
    setVisible(true);
    setAlertContent(name);
  };

  const handleModal = (record: any) => {
    setModalOpen(true);
    setModalContent(record);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (text, record) => (
        <a onClick={() => handleModal(record)}>{text}</a>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => handleAlert(record.name)}
            className="text-orange-300"
          >
            Update
          </a>
          <NotificationComponent message={`Delete`} />
        </Space>
      ),
    },
  ];
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/users");
      return res.json();
    },
  });
  const handleClose = () => {
    setVisible(!visible);
    setAlertContent(null);
  };
  return (
    <>
      <ModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
      {visible && (
        <Alert
          showIcon
          closable
          onClose={handleClose}
          message={alertContent}
          type="success"
        />
      )}
      <Table
        caption="User Data"
        loading={false}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
}
