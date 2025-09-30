import { Button, Switch, Transfer, TransferProps } from "antd";
import { useEffect, useState } from "react";
interface RecordType {
  key: string;
  title: string;
  description: string;
  // disabled?: boolean;
  chosen: boolean;
}
export default function TransferComponent() {
  // const mockData = Array.from({ length: 20 }).map<RecordType>((_, i) => ({
  //   key: i.toString(),
  //   title: `content${i + 1}`,
  //   description: `description of content${i + 1}`,
  //   disabled: i % 3 < 1,
  // }));
  const [mockData, setMockData] = useState<RecordType[]>([]);

  const oriTargetKeys = mockData
    .filter((item) => Number(item.key) % 3 > 1)
    .map((item) => item.key);

  const initialTargetKeys = mockData
    .filter((item) => Number(item.key) > 10)
    .map((item) => item.key);

  const [targetKeys, setTargetKeys] =
    useState<TransferProps["targetKeys"]>(oriTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>(
    []
  );
  const [disabled, setDisabled] = useState(false);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const onChange: TransferProps["onChange"] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll: TransferProps["onScroll"] = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  const handleDisable = (checked: boolean) => {
    setDisabled(checked);
  };

  const filterOption = (inputValue: string, option: RecordType) =>
    option.description.indexOf(inputValue) > -1;

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch: TransferProps["onSearch"] = (dir, value) => {
    console.log("search:", dir, value);
  };

  const renderFooter: TransferProps["footer"] = (_, info) => {
    if (info?.direction === "left") {
      return (
        <Button
          size="small"
          style={{ display: "flex", margin: 8, marginInlineEnd: "auto" }}
          onClick={getMock}
        >
          Left button reload
        </Button>
      );
    }
    return (
      <Button
        size="small"
        style={{ display: "flex", margin: 8, marginInlineStart: "auto" }}
        onClick={getMock}
      >
        Right button reload
      </Button>
    );
  };

  const renderItem = (item: RecordType) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
        {/* {item.chosen ? "😊" : "☹️"} */}
        {/* image */}
        {item.chosen ? (
          <img
            src="https://img.icons8.com/emoji/48/000000/smiling-face-with-smiling-eyes.png"
            alt="smiling"
            style={{ width: 16, height: 16, marginInlineStart: 4 }}
          />
        ) : (
          <img
            src="https://img.icons8.com/emoji/48/000000/crying-face.png"
            alt="crying"
            style={{ width: 16, height: 16, marginInlineStart: 4 }}
          />
        )}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  return (
    <>
      <Transfer
        dataSource={mockData}
        titles={["Source", "Target"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        // oneWay
        // onChange={onChange}
        listStyle={{
          width: 250,
          height: 300,
        }}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        // render={(item) => item.title}
        disabled={disabled}
        showSearch
        filterOption={filterOption}
        onSearch={handleSearch}
        onChange={handleChange}
        operations={["to right", "to left"]}
        footer={renderFooter}
        render={renderItem}
      />
      <Switch
        unCheckedChildren="disabled"
        checkedChildren="disabled"
        checked={disabled}
        onChange={handleDisable}
      />
    </>
  );
}
