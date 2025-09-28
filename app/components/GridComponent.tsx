import { Col, Row } from "antd";
import React from "react";

const ColumnStyle: React.CSSProperties = {
  backgroundColor: "#0092ff",
  padding: "8px",
  color: "white",
  textAlign: "center",
};

export default function GridComponent() {
  return (
    <>
      <Row className="mt-6">
        <Col style={ColumnStyle} span={24}>
          Col 24
        </Col>
      </Row>
      <Row className="mt-6">
        <Col style={ColumnStyle} span={12}>
          Col 12
        </Col>
        <Col style={ColumnStyle} span={12}>
          Col 12
        </Col>
      </Row>
      <Row gutter={[16, 24]} className="mt-6">
        <Col className="bg-[#f0f0f0] py-2" span={6}>
          <div style={ColumnStyle}>col-6</div>
        </Col>
        <Col className="bg-[#f0f0f0] py-2" span={6}>
          <div style={ColumnStyle}>col-6</div>
        </Col>
        <Col className="bg-[#f0f0f0] py-2" span={6}>
          <div style={ColumnStyle}>col-6</div>
        </Col>
        <Col className="bg-[#f0f0f0] py-2" span={6}>
          <div style={ColumnStyle}>col-6</div>
        </Col>
      </Row>
      <Row className="mt-6">
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
      </Row>
      <Row className="mt-6">
        <Col span={6}>col-6 col-offset-6</Col>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
      </Row>
      {/* align */}
      <Row justify="space-around" className="mt-6">
        <Col className="bg-[#f0f0f0] py-2" span={4}>
          col-4
        </Col>
        <Col className="bg-[#f0f0f0] py-2" span={4}>
          col-4
        </Col>
        <Col className="bg-[#f0f0f0] py-2" span={4}>
          col-4
        </Col>
        <Col className="bg-[#f0f0f0] py-2" span={4}>
          col-4
        </Col>
      </Row>
      {/* order */}
      <Row className="mt-6" gutter={16}>
        <Col
          className="bg-[#f0f0f0] py-2"
          span={6}
          xs={{ order: 1 }}
          sm={{ order: 2 }}
          md={{ order: 3 }}
          lg={{ order: 4 }}
        >
          1 col-order-responsive
        </Col>
        <Col
          className="bg-[#f0f0f0] py-2"
          span={6}
          xs={{ order: 2 }}
          sm={{ order: 1 }}
          md={{ order: 4 }}
          lg={{ order: 3 }}
        >
          2 col-order-responsive
        </Col>
        <Col
          className="bg-[#f0f0f0] py-2"
          span={6}
          xs={{ order: 3 }}
          sm={{ order: 4 }}
          md={{ order: 2 }}
          lg={{ order: 1 }}
        >
          3 col-order-responsive
        </Col>
        <Col
          className="bg-[#f0f0f0] py-2"
          span={6}
          xs={{ order: 4 }}
          sm={{ order: 3 }}
          md={{ order: 1 }}
          lg={{ order: 2 }}
        >
          4 col-order-responsive
        </Col>
      </Row>
    </>
  );
}
