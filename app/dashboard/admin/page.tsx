"use client";
import CardComponent from "@/app/components/Card";
import { getPhotos } from "@/lib/getPhotos";
import { RocketOutlined, UpOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, FloatButton } from "antd";

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function AdminDashBoard() {
  const { data: photos } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      return await getPhotos();
    },
  });
  return (
    <>
      {/* <Button
        variant="dashed"
        shape="default"
        // loading={true}
        color="blue"
        size="large"
        icon="(:"
        iconPosition="end"
        block={false}
      >
        Button
      </Button> */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
        {photos?.map((photo: Photo) => (
          <CardComponent key={photo.id} photo={photo} />
        ))}
      </div>
      <FloatButton.BackTop
        icon={<UpOutlined className="text-white" />}
        className="hover:bg-orange-600 hover:border-none"
      />
    </>
  );
}
