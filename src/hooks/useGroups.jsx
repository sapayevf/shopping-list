import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../utils/API";
import { message } from "antd";

const fetchGroups = async () => {
  const { data } = await API.get("/groups");
  return data;
};

const addMember = async ({ groupId, memberId }) => {
  await API.post(`/groups/${groupId}/members`, { memberId });
};

const useGroups = () => {
  const queryClient = useQueryClient();

  const {
    data: groups = [],
    isLoading: groupsLoading,
    refetch: refetchGroups,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  const getGroupMembers = async (groupId) => {
    try {
      return await fetchMembers(groupId);
    } catch (error) {
      console.error("Error fetching group members:", error);
      return [];
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await API.get(`/groups/${groupId}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      message.error("Failed to load members.");
    }
  };

  const addMemberMutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      message.success("Member added successfully!");
      queryClient.invalidateQueries(["groups"]);
    },
    onError: () => {
      message.error("Failed to add member.");
    },
  });

  return {
    groups,
    groupsLoading,
    refetchGroups,
    getGroupMembers,
    addMemberMutation,
  };
};

export default useGroups;
