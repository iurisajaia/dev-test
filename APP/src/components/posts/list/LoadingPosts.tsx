import { Card, Row, Col } from "antd";

const LoadingPosts = () => {
  return (
    <Row gutter={[16, 16]}>
      {Array(10)
        .fill(" ")
        .map((_, index: number) => {
          return (
            <Col span={8} key={index}>
              <Card style={{ width: 300, marginTop: 16 }} loading={true} />
            </Col>
          );
        })}
    </Row>
  );
};

export default LoadingPosts;
