import { useParams } from "react-router-dom";
import "./Group.scss";
import { Input } from "antd";
import { FiSearch } from "react-icons/fi";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";

const GroupDetail = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const { users, usersLoading } = useUsers(search);

  return (
    <div className="group-detail">
      <h1>Group Detail</h1>
      <p>Selected Group ID: {id}</p>
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
            {usersLoading && <p>Loading...</p>}
            {users?.map((user) => (
              <h3 key={user._id}>{user.name}</h3>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
