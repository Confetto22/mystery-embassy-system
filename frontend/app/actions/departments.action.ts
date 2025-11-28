"use server";

import apiClient from "@/lib/api-client";

export const fetchDepartments = async (filters: { name?: string }) => {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value) {
        queryParams.append(key, value);
      }
    });
  }

  const response = await apiClient.get(`/departments/all?${queryParams}`);
  // departments/all?name=worship
  if (!response.data) {
    throw new Error("Failed to fetch departments data");
  }
  const result = response.data;
  return result;
};

export const fetchSingleDepartment = async (id: string) => {
  const response = await apiClient.get(`/departments/${id}`);
  if (!response.data) {
    throw new Error("Failed to fetch department data");
  }
  const result = response.data;
  return result;
};
