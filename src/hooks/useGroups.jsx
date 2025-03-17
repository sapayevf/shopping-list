import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../utils/API";

const fetchGroups = async (search) => {
  try {
    const endpoint = search ? `/groups/search?q=${search}` : "/groups";
    const { data } = await API.get(endpoint);
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

const joinGroupRequest = async ({ groupId, password }) => {
  try {
    const { data } = await API.post(`/groups/${groupId}/join`, { password });
    return data;
  } catch (error) {
    console.error("Group join failed:", error);
    throw error;
  }
};

const useGroups = (search) => {
  const queryClient = useQueryClient();

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ["groups", search],
    queryFn: () => fetchGroups(search),
  });

  const createGroupMutation = useMutation({
    mutationFn: createGroupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });

  const joinGroupMutation = useMutation({
    mutationFn: joinGroupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });

  return {
    groups,
    groupsLoading,
    createGroup: createGroupMutation.mutate,
    joinGroup: joinGroupMutation.mutateAsync,
  };
};

export default useGroups;
