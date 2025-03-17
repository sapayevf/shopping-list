import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile/Profile";
import GroupDetail from "../pages/Group/Group";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" element={<Profile />} />
        <Route path="/groupdetail" element={<GroupDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/group/:groupId" element={<GroupDetail />} />
    </Routes>
  );
};

export default Router;
