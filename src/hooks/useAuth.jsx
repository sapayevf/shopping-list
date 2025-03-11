import { useNavigate } from "react-router-dom";
import API from "../utils/API";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const login = async ({ username, password }) => {
  const res = await API.post("/auth", {
    username,
    password,
  });
  return res;
};

const register = async ({ username, password, name }) => {
  const res = await API.post("/users", {
    username,
    password,
    name,
  });
  return res;
};

const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      navigate("/");
      toast.success("Login succsessfull");
    },
    onError() {
      toast.error("Login failes");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      navigate("/");
      toast.success("Register succsessfull");
    },
    onError() {
      toast.error("Register failed");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    loginMutation,
    registerMutation,
    logout
  };
};

export default useAuth;
