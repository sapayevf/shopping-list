import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile/Profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
