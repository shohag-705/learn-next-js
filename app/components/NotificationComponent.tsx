import { Button, notification } from "antd";
export default function NotificationComponent({
  message,
}: {
  message: string;
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Message will be deleted",
      description:
        "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
      duration: 1.5,
    });
  };
  return (
    <>
      {contextHolder}
      <a className="text-red-500" onClick={openNotification}>
        {message}
      </a>
    </>
  );
}
