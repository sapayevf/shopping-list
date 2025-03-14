import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

const searchGroup = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];

  try {
    const { data } = await API.get(`/groups/search?q=${searchText}`);
    return data;
  } catch (error) {
    console.error("Group search failed:", error);
    return [];
  }
};

const useGroups = (searchText) => {
  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: searchText.length > 1 ? ["search", searchText] : ["search"],
    queryFn: () => searchGroup(searchText),
    enabled: searchText.length > 1,
    onError: (error) => {
      console.error("Error fetching groups:", error);
    },
  });

  return {
    groups,
    groupsLoading,
  };
};

export default useGroups;
