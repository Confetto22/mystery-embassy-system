import { useQuery } from "@tanstack/react-query";
import { fetchDepartments, fetchMembers, fetchOverview } from "./api";

export const useGetOverviewQuery = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: fetchOverview,
  });
};

export const useGetMembersQuery = (filters = {}) => {
  return useQuery({
    queryKey: ["members", filters],
    queryFn: () => fetchMembers(filters),
  });
};

export const useGetDeptsQuery = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
};
