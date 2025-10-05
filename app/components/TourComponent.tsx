import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tour, TourProps } from "antd";
import { useEffect, useRef, useState } from "react";
export default function TourComponent() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const steps: TourProps["steps"] = [
    {
      title: "Upload File",
      description: "Put your files here.",
      cover: (
        <img
          draggable={false}
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
      placement: "bottom",
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => ref2.current,
      placement: "center",
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current,
    },
  ];
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <>
      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        // mask={false}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </>
  );
}
