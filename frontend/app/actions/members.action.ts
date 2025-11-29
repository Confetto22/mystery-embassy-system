"use server";

import apiClient from "@/lib/api-client";
import type { CreateMemberData, Member } from "@/lib/types";

// export interface CreateMemberData {
//   firstname: string;
//   lastname: string;
//   other_names?: string;
//   phone: string;
//   address: string;
//   gender: string;
//   memberType: string;
//   department_id?: string | null;
//   isHead?: boolean;
// }

// export interface UpdateMemberData extends Partial<Member> {
//   id: string;
// }

export interface BulkUpdateMemberData {
  memberIds: string[];
  updates: Partial<Member>;
}

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

export const createMember = async (data: CreateMemberData) => {
  const response = await apiClient.post("/members/new", data);
  if (!response.data) {
    throw new Error("Failed to create member");
  }
  return response.data;
};

export const updateMember = async (data: Member) => {
  const { id, ...updateData } = data;
  const response = await apiClient.put(`/members/${id}`, updateData);
  if (!response.data) {
    throw new Error("Failed to update member");
  }
  return response.data;
};

export const deleteMember = async (memberId: string) => {
  const response = await apiClient.delete(`/members/${memberId}`);
  if (!response.data) {
    throw new Error("Failed to delete member");
  }
  return response.data;
};

export const bulkUpdateMembers = async (data: BulkUpdateMemberData) => {
  const response = await apiClient.patch("/members/bulk", data);
  if (!response.data) {
    throw new Error("Failed to bulk update members");
  }
  return response.data;
};

export const importMembersFromCSV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post("/members/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (!response.data) {
    throw new Error("Failed to import members");
  }
  return response.data;
};
