import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../utils/API";
import { toast } from "sonner";

const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const { data } = await API.get("/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const login = async ({ username, password }) => {
  const res = await API.post("/auth", { username, password });
  return res;
};

const register = async ({ username, password, name }) => {
  const res = await API.post("/users", { username, password, name });
  return res;
};

const refetchGroups = async () => {
  try {
    const response = await API.get("/groups");
    setGroups(response.data);
  } catch (error) {
    console.error("Error fetching groups:", error);
    message.error("Failed to refresh groups.");
  }
};

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem("token", data.data.token);
      queryClient.invalidateQueries(["user"]);
      navigate("/");
      toast.success("Login successful");
    },
    onError() {
      toast.error("Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess(data) {
      localStorage.setItem("token", data.data.token);
      queryClient.invalidateQueries(["user"]);
      navigate("/");
      toast.success("Register successful");
    },
    onError() {
      toast.error("Register failed");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["user"], null);
    navigate("/login");
  };

  return {
    user,
    userLoading,
    loginMutation,
    registerMutation,
    logout,
    refetchGroups,
  };
};

export default useAuth;
