import { Link, Navigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace={true} />;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginMutation } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate({ username, password });
  };

  return (
    <div className="div">
      <div className="login">
        <h2>Sign In</h2>
        <form>
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
          <button onClick={handleSubmit}>Sign in</button>
        </form>
        <p>
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
