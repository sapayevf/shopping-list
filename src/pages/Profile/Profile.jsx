import { useState, useEffect } from "react";
import { Card, Avatar, Button, Typography, Space } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import API from "../../utils/API";

const { Title, Text } = Typography;

const Profile = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth");
        setUser(data);
      } catch (error) {
        console.error("User fetch failed:", error);
      }
    };

    fetchUser();
  }, []);

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
        {console.log(user)
        }
        <Avatar
          size={100}
          style={{ backgroundColor: "#d32f2f", fontSize: "40px" }}
        >
          {user?.name ? user.name[0].toUpperCase() : "?"}
        </Avatar>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {user?.name || "Loading..."}{" "}
            <span style={{ color: "green", fontSize: "14px" }}>🟢 Active</span>
          </Title>
          <Text type="secondary">{user?.username || ""}</Text>
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
