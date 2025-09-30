import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
export default function AvatarPage({
  size = 64,
  icon: AvatarIcon = UserOutlined,
}: {
  size: number;
  icon: React.ComponentType;
}) {
  return (
    <Badge count={5}>
      <Avatar size={size} icon={<AvatarIcon />} shape="square" />
    </Badge>
  );
}
