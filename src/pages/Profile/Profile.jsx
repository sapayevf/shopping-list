import { Card, Avatar, Button, Typography, Space } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";

const { Title, Text } = Typography;

const Profile = () => {
  const { logout } = useAuth();

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Card
        style={{
          width: "100%",
          borderRadius: "12px",
          background: "#fff",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Avatar
          size={100}
          style={{ backgroundColor: "#d32f2f", fontSize: "40px" }}
        >
          F
        </Avatar>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Feruzbek{" "}
            <span style={{ color: "green", fontSize: "14px" }}>🟢 Active</span>
          </Title>
          <Text type="secondary">Sapayev</Text>
        </div>
        <Space style={{ marginLeft: "auto" }}>
          <Button type="primary" icon={<CopyOutlined />}>
            Copy Username
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Delete Account
          </Button>
          <Button onClick={logout} type="default">
            Logout
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
