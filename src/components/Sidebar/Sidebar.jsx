import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  const [groups, setGroups] = useState([
    { _id: "1", name: "Group 1" },
  ]);
  const [groupName, setGroupName] = useState("");

  const addGroup = () => {
    if (groupName.trim()) {
      setGroups([...groups, { _id: Date.now().toString(), name: groupName }]);
      setGroupName("");
    }
  };

  return (
    <div className="sidebar">
      <h2>Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            <Link to={`/groupdetail`}>{group.name}</Link>
          </li>
        ))}
      </ul>
      <div className="add-group">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
        />
        <button onClick={addGroup}>Add</button>
      </div>
    </div>
  );
};

export default Sidebar;
