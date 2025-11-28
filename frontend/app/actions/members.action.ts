"use server";

import apiClient from "@/lib/api-client";

export const fetchMembers = async (filters: {
  firstname?: string;
  departmentId?: string;
}) => {
  const queryParams = new URLSearchParams();

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value) {
        queryParams.append(key, value);
      }
    });
  }

  const response = await apiClient.get(`/members/all?${queryParams}`);
  if (!response.data) {
    throw new Error("Failed to fetch members data");
  }
  const result = response.data;
  return result;
};

export const fetchMemberById = async (memberId: string) => {
  const response = await apiClient.get(`/members/${memberId}`);
  if (!response.data) {
    throw new Error("Failed to fetch member data");
  }
  const result = response.data;
  return result;
};
