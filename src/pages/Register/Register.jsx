import { Link } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerMutation } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    registerMutation.mutate({ username, password, name });
  };

  return (
    <div className="div">
      <div className="login">
        <h2>Register</h2>
        <form>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name..."
          />
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username..."
          />
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password..."
          />
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
