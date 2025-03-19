import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Modal, List, Avatar, Spin, message } from "antd";
import useGroups from "../../hooks/useGroups";
import useUsers from "../../hooks/useUsers";
import useAuth from "../../hooks/useAuth";
import API from "../../utils/API";
import { FiSearch } from "react-icons/fi";
import "./GroupDetail.scss";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, refetchGroups } = useGroups();
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { users, usersLoading, refetchUsers } = useUsers(search);

  const group = groups.find((g) => g._id === groupId);
  if (!group) return <p>Group not found</p>;

  const members = group.members || [];
  const isOwner = user && group?.owner._id === user?._id;

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await API.get(`/groups/${groupId}/members`);
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleAddMember = async (memberId) => {
    try {
      await API.post(`/groups/${groupId}/members`, { memberId });
      message.success("Member added successfully!");
      fetchMembers();
      refetchGroups();
    } catch (error) {
      console.error("Error adding member:", error);
      message.error("Failed to add member.");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await API.delete(`/groups/${groupId}`);
      message.success("Group deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting group:", error);
      message.error("Failed to delete the group.");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await API.post(`/groups/${groupId}/leave`);
      message.success("You left the group.");
      navigate("/");
    } catch (error) {
      console.error("Error leaving group:", error);
      message.error("Failed to leave the group.");
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await API.delete(`/groups/${groupId}/members/${memberId}`);
      message.success("Member deleted successfully!");
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      message.error("Failed to delete member.");
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
          {isOwner ? (
            <Button type="primary" danger onClick={handleDeleteGroup}>
              Delete Group
            </Button>
          ) : (
            <Button type="primary" danger onClick={handleLeaveGroup}>
              Leave Group
            </Button>
          )}
          {isOwner && (
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Add Member
            </Button>
          )}
        </div>
      </div>

      <div className="group-info">
        <div style={{ height: "100%" }} className="group-title">
          <h3>Group</h3>
        </div>
        <div style={{ height: "100%" }} className="group-members">
          <h3>Members</h3>
          {members.length === 0 ? (
            <p>No members yet.</p>
          ) : (
            <div className="members-list">
              {members.length === 0 ? (
                <p className="no-members">No members yet.</p>
              ) : (
                members?.map((member) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={member?._id}
                    className="member-item"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div className="avatar">{member?.name?.[0] || "?"}</div>
                      <div className="member-info">
                        <h4>{member?.name || "Unknown"}</h4>
                        <p>{member?.username || "No username"}</p>
                      </div>
                    </div>
                    {isOwner && (
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteMember(member?._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

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
                <Button
                  type="primary"
                  onClick={() => handleAddMember(user._id)}
                >
                  Add
                </Button>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};

export default GroupDetail;
