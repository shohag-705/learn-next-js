import { Button, Card, Flex, Typography } from "antd";
import { Photo } from "../dashboard/admin/page";
export default function CardComponent({ photo }: { photo: Photo }) {
  return (
    <Card
      hoverable
      style={{
        width: 620,
      }}
    >
      <Flex justify="space-between">
        <img
          style={{ width: 320, height: 280, objectFit: "cover" }}
          src={photo.thumbnailUrl}
          alt={photo.title}
        />
        <Flex
          align="flex-start"
          justify="flex-start"
          vertical
          style={{ padding: 16 }}
        >
          <Typography.Title level={3}>{photo.title}</Typography.Title>
          <Button type="primary">Get started</Button>
        </Flex>
      </Flex>
    </Card>
  );
}
