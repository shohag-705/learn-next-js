import { Alert, Flex, Space, Spin, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
export default function SpinComponent() {
  const [loading, setLoading] = useState<boolean>(false);

  const [auto, setAuto] = useState(false);
  const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  let timer = null

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      (v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      };
    }, 100);
    return () => clearTimeout(timerRef.current!);
  }, [percent]);
  const mergedPercent = auto ? "auto" : percent;
  return (
    <>
      <Space size={"large"}>
        <Spin spinning={true} size="large" />
        {/* loading set in switch */}

        <Flex gap="middle" vertical>
          <Spin spinning={loading} delay={500}>
            <Alert
              type="info"
              message="Alert message title"
              description="Further details about the context of this alert."
            />
          </Spin>
          <p>
            Loading state：
            <Switch checked={loading} onChange={setLoading} />
          </p>
        </Flex>

        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={auto}
          onChange={() => {
            setAuto(!auto);
            setPercent(-50);
          }}
        />
        <Spin percent={mergedPercent} size="large" />
      </Space>
      <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
    </>
  );
}
