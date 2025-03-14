import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

const searchUser = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];

  try {
    const { data } = await API.get(`/users/search?q=${searchText}`);
    return data;
  } catch (error) {
    console.error("User search failed:", error);
    return [];
  }
};

const useUsers = (searchText) => {
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: searchText.length > 1 ? ["users", searchText] : ["users"],
    queryFn: () => searchUser(searchText),
    enabled: searchText.length > 1,
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });

  return { users, usersLoading };
};

export default useUsers;
