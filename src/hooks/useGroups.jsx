import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../utils/API";

const fetchGroups = async () => {
  try {
    const { data } = await API.get("/groups");
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};

const createGroupRequest = async (groupData) => {
  try {
    const { data } = await API.post("/groups", groupData);
    return data;
  } catch (error) {
    console.error("Group creation failed:", error);
    return null;
  }
};

const useGroups = () => {
  const queryClient = useQueryClient();

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  const createGroupMutation = useMutation({
    mutationFn: createGroupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]); 
    },
  });

  return {
    groups,
    isLoading,
    createGroup: createGroupMutation.mutate,
  };
};

export default useGroups;
