import { Flex, Rate } from "antd";
import { useState } from "react";
export default function RatingComponent() {
  const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);
  return (
    <div className="mt-4">
      <h1>Rating component</h1>
      <Flex vertical align="flex-start" gap="middle">
        <Rate
          allowHalf
          allowClear
          value={value}
          tooltips={desc}
          onChange={setValue}
        />
        {value ? <span>{desc[value - 1]}</span> : null}
      </Flex>
      <Rate
        allowHalf
        defaultValue={3}
        character={({ index = 0 }) => {
          return index + 1;
        }}
      />
    </div>
  );
}
