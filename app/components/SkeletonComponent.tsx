import { Button, Skeleton, Space } from "antd";
import { useState } from "react";
export default function SkeletonComponent() {
  const [loading, setLoading] = useState(false);
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      {/* <Skeleton avatar paragraph={{ rows: 4 }} active={true} /> */}

      <Space direction="vertical" style={{ width: "100%" }} size="small">
        {loading ? (
          <>
            <Skeleton.Input
              style={{ width: 200, height: 24, marginBottom: 16 }}
              active
            />
            <Skeleton.Input
              style={{ width: "100%", height: 16, marginBottom: 8 }}
              active
            />
            <Skeleton.Input style={{ width: "90%", height: 16 }} active />
          </>
        ) : (
          <>
            <h4 style={{ marginBottom: 16 }}>Ant Design, a design language</h4>
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          </>
        )}

        <Button onClick={showSkeleton} disabled={loading}>
          Show Skeleton
        </Button>
      </Space>
    </>
  );
}
