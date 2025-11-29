"use server";

import apiClient from "@/lib/api-client";
import type { Department } from "@/lib/types";

export interface CreateDepartmentData {
  name: string;
  description: string;
  color?: string;
}

export interface UpdateDepartmentData extends Partial<CreateDepartmentData> {
  id: string;
}

export interface AssignHeadData {
  departmentId: string;
  memberId: string;
}

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

export const createDepartment = async (data: CreateDepartmentData) => {
  const response = await apiClient.post("/departments", data);
  if (!response.data) {
    throw new Error("Failed to create department");
  }
  return response.data;
};

export const updateDepartment = async (data: UpdateDepartmentData) => {
  const { id, ...updateData } = data;
  const response = await apiClient.put(`/departments/${id}`, updateData);
  if (!response.data) {
    throw new Error("Failed to update department");
  }
  return response.data;
};

export const deleteDepartment = async (departmentId: string) => {
  const response = await apiClient.delete(`/departments/${departmentId}`);
  if (!response.data) {
    throw new Error("Failed to delete department");
  }
  return response.data;
};

export const assignDepartmentHead = async (data: AssignHeadData) => {
  const response = await apiClient.post(`/departments/${data.departmentId}/head`, {
    memberId: data.memberId,
  });
  if (!response.data) {
    throw new Error("Failed to assign department head");
  }
  return response.data;
};
