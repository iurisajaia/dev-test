import { FC } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navigation: FC = () => {
  return (
    <Header>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        items={[{ key: "/", label: <Link to="/">Users</Link> }]}
      />
    </Header>
  );
};

export default Navigation;
