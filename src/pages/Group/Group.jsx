import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Modal, List, Avatar, Spin } from "antd";
import useGroups from "../../hooks/useGroups";
import useUsers from "../../hooks/useUsers";
import API from "../../utils/API";
import { FiSearch } from "react-icons/fi";
import "./Group.scss";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups } = useGroups();

  const [search, setSearch] = useState("");
  const { users, usersLoading } = useUsers(search);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const group = groups.find((g) => g._id === groupId);
  if (!group) return <p>Group not found</p>;

  const handleDeleteGroup = async () => {
    try {
      await API.delete(`/groups/${groupId}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#f0f2f5",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>{group.name}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>
            <b>Owner:</b> {group.owner.name}{" "}
            <span style={{ color: "gray" }}>{group.owner.username}</span>
          </p>
          <Button type="primary" danger onClick={handleDeleteGroup}>
            Delete Group
          </Button>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Member
          </Button>
        </div>
      </div>

      <div className="group-info">
        <div style={{ height: "100%" }} className="group-title">
          <h3>Group</h3>
        </div>
        <div style={{ height: "100%" }} className="group-members">
          <h3>Members</h3>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal
        title="Add Member"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="modal-member"
      >
        <Input
          placeholder="Search user..."
          prefix={<FiSearch />}
          style={{
            width: "100%",
            borderRadius: "20px",
            padding: "8px 15px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            marginBottom: "15px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {usersLoading ? (
          <Spin />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{user.name[0]}</Avatar>}
                  title={user.name}
                  description={user.username}
                />
                <Button type="primary">Add</Button>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};

export default GroupDetail;
