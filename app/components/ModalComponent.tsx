import { Modal } from "antd";
import { Typography, Tag, Space } from "antd";

const { Title, Text } = Typography;
export default function ModalComponent({
  modalOpen,
  setModalOpen,
  modalContent: user,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalContent: any;
}) {
  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Typography>
          <Title level={4}>{user?.name}</Title>
          <Text strong>ID:</Text> <Text>{user?.id}</Text>
          <br />
          <Text strong>Age:</Text> <Text>{user?.age}</Text>
          <br />
          <Text strong>Address:</Text> <Text>{user?.address}</Text>
          <br />
          <Text strong>Tags:</Text>
          <Space>
            {user?.tags.map((tag: string) => (
              <Tag color="blue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))}
          </Space>
        </Typography>
      </Modal>
    </>
  );
}
