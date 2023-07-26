import { FaTrashCan } from "react-icons/fa6";
import { Row, Card, Col, Button, Layout, Input, Space } from "antd";

import LoadingPosts from "./LoadingPosts";
import usePostsList from "./usePostsList";
import { Post } from "../../../utils/types";

const PostsList = () => {
  const {
    hasPosts,
    searchText,
    filteredPosts,
    handleDeletePost,
    handleSearchPosts,
  } = usePostsList();

  if (!hasPosts) return <LoadingPosts />;

  return (
    <Layout>
      <Space size={[16, 0]}>
        <Input
          onChange={handleSearchPosts}
          value={searchText}
          placeholder="Search"
        />
      </Space>
      <Row gutter={[16, 16]}>
        {filteredPosts.map((post: Post) => {
          return (
            <Col span={8}>
              <Card title={post.title} bordered={false}>
                <p className="post-text">{post.body}</p>
                <div className="text-right">
                  <Button danger onClick={() => handleDeletePost(post.id)}>
                    <FaTrashCan />
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Layout>
  );
};

export default PostsList;
