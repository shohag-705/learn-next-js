"use client";
import { Select, Slider, Switch } from "antd";
import { useState } from "react";
export default function SelectComponent() {
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };
  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "1",
            label: "Not Identified",
          },
          {
            value: "2",
            label: "Closed",
          },
          {
            value: "3",
            label: "Communicated",
          },
          {
            value: "4",
            label: "Identified",
          },
          {
            value: "5",
            label: "Resolved",
          },
          {
            value: "6",
            label: "Cancelled",
          },
        ]}
      />
      {/* slider */}
      <div className="mt-6">
        <Slider range defaultValue={[12, 34]} disabled={disabled} />
        Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
      </div>
    </>
  );
}
