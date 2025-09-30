import { SmileOutlined } from "@ant-design/icons";
import { TreeSelect, TreeSelectProps } from "antd";
import { useState } from "react";

const icon = <SmileOutlined />;
const { SHOW_PARENT } = TreeSelect;
const MAX_COUNT = 2;

export default function TreeSelectComponent() {
  const [value, setValue] = useState<string>();

  const treeData = [
    {
      title: "Node1",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "Child Node1",
          value: "0-0-0",
          key: "0-0-0",
        },
      ],
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: "Child Node3",
          value: "0-1-0",
          key: "0-1-0",
        },
        {
          title: "Child Node4",
          value: "0-1-1",
          key: "0-1-1",
        },
        {
          title: "Child Node5",
          value: "0-1-2",
          key: "0-1-2",
        },
      ],
    },
  ];
  const onPopupScroll: TreeSelectProps["onPopupScroll"] = (e) => {
    console.log("onPopupScroll", e);
  };

  const onChange = (newValue: string) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <>
      <TreeSelect
        showCheckedStrategy={TreeSelect.SHOW_CHILD}
        style={{ width: "50%" }}
        placeholder="Please select"
        allowClear
        suffixIcon={icon}
        value={value}
        treeData={treeData}
        onPopupScroll={onPopupScroll}
        onChange={onChange}
        treeDefaultExpandAll
        multiple
        styles={{
          popup: { root: { maxHeight: 400, overflow: "auto" } },
        }}
        placement="topLeft"
        // status="error"
        prefix="Prefix"
        treeCheckable
        variant="filled"
        maxCount={MAX_COUNT}
      />
    </>
  );
}
