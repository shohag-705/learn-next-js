import { CloseCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
export default function ResultComponent() {
  const handleOrder = () => {
    console.log("Order successfully done");
  };
  return (
    <>
      <Result
        // status={"success"}
        // status={"error"}
        // status={"404"}
        status={"500"}
        // icon={<SmileOutlined />}
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button onClick={handleOrder} type="primary" key={"console"}>
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      >
        <div>
          <h1>This is not working X</h1>
        </div>
      </Result>
    </>
  );
}
