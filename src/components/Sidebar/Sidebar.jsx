import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import useGroups from "../../hooks/useGroups";
import "./Sidebar.scss";

const Sidebar = () => {
  const { groups, createGroup } = useGroups();
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateGroup = () => {
    if (groupName.trim() && password.trim()) {
      createGroup({ name: groupName, password });
      setGroupName("");
      setPassword("");
    }
  };

  return (
    <div className="sidebar">
      <h2>Groups</h2>

      <Input
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Input.Password
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Button type="primary" onClick={handleCreateGroup}>
        Create Group
      </Button>

      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            <Link to={`/group/${group._id}`}>{group.name}</Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
