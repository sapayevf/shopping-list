import { Layout, Menu } from "antd";
import { UserOutlined, TeamOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={250}
      style={{
        height: "100vh",
        marginTop: "60px",
        background: "#fff",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Menu
        mode="vertical"
        defaultSelectedKeys={["1"]}
        style={{ borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Profile</Link>
        </Menu.Item>
        <Menu.SubMenu key="2" icon={<TeamOutlined />} title="Groups">
          <Menu.Item key="3">My Groups</Menu.Item>
          <Menu.Item key="4">Explore</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="5" icon={<PlusOutlined />}>
          <Link to="/create-group">Create Group</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
