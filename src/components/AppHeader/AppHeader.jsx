import { Layout, Input, Button, Badge, Modal } from "antd";
import { Link } from "react-router-dom";
import { FiSearch, FiBell, FiSettings, FiRefreshCw } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useGroups from "../../hooks/useGroups";
import "./AppHeader.scss";

const { Header } = Layout;

const AppHeader = () => {
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const { groups, groupsLoading, joinGroup } = useGroups(search);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoinClick = (group) => {
    setSelectedGroup(group);
    setPassword("");
    setModalOpen(true);
  };

  const handleJoinGroup = async () => {
    if (!selectedGroup) return;
    setLoading(true);
    try {
      await joinGroup({ groupId: selectedGroup._id, password });
      setModalOpen(false);
    } catch (error) {
      console.error("Join failed:", error);
    }
    setLoading(false);
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "10px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: "5",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link
          to="/"
          style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}
        >
          Shopping List
        </Link>
        <Button type="primary" shape="round">
          + New
        </Button>
      </div>

      <div className="group-search">
        <div className="input-group">
          <Input
            placeholder="Search group and join..."
            prefix={<FiSearch />}
            style={{ width: "400px", borderRadius: "20px" }}
            value={search}
            className="input-search"
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 && (
            <div className="content">
              {groupsLoading && <p>Loading...</p>}
              {groups?.map((group) => (
                <div key={group._id} className="groups">
                  <div>
                    <h3>{group.name}</h3>
                    <p>Created by {group.owner.name}</p>
                  </div>
                  <Button type="primary" onClick={() => handleJoinClick(group)}>
                    Join
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <FiRefreshCw size={22} style={{ cursor: "pointer" }} />
        <Badge count={9} size="small">
          <FiBell size={22} style={{ cursor: "pointer" }} />
        </Badge>
        <FiSettings size={22} style={{ cursor: "pointer" }} />
        <Button type="primary" danger onClick={logout}>
          Logout
        </Button>
      </div>

      <Modal
        title="Enter Group Password"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="join"
            type="primary"
            loading={loading}
            onClick={handleJoinGroup}
          >
            Join
          </Button>,
        ]}
      >
        <Input.Password
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </Header>
  );
};

export default AppHeader;
