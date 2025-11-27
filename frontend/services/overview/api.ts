import apiClient from "@/lib/api-client";

export const fetchOverview = async () => {
  const response = await apiClient.get("/overview");
  return response.data;
};

export const fetchMembers = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, String(value));
  });
  const response = await apiClient.get(`/members/filter?${params}`);
  return response.data;
};

export const fetchDepartments = async () => {
  const response = await apiClient.get("/departments/all");
  return response.data;
};
