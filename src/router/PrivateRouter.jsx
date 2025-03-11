import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivateRouter;
