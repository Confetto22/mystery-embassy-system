"use server";

import apiClient from "@/lib/api-client";
import type { Attendance } from "@/lib/types";

export interface RecordAttendanceData {
  memberId: string;
  eventId?: string;
  serviceId?: string;
  attendance_status: "present" | "absent" | "late";
  date: string;
  time?: string;
}

export interface BulkAttendanceData {
  memberIds: string[];
  eventId?: string;
  serviceId?: string;
  attendance_status: "present" | "absent" | "late";
  date: string;
}

export interface AttendanceFilters {
  date?: string;
  eventId?: string;
  serviceId?: string;
  departmentId?: string;
  memberId?: string;
  startDate?: string;
  endDate?: string;
}

export const recordAttendance = async (data: RecordAttendanceData) => {
  const response = await apiClient.post("/attendance", data);
  if (!response.data) {
    throw new Error("Failed to record attendance");
  }
  return response.data;
};

export const bulkRecordAttendance = async (data: BulkAttendanceData) => {
  const response = await apiClient.post("/attendance/bulk", data);
  if (!response.data) {
    throw new Error("Failed to bulk record attendance");
  }
  return response.data;
};

export const fetchAttendance = async (filters?: AttendanceFilters) => {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value) {
        queryParams.append(key, value);
      }
    });
  }

  const url = filters && Object.keys(filters).length > 0
    ? `/attendance?${queryParams}`
    : "/attendance";
  
  const response = await apiClient.get(url);
  if (!response.data) {
    throw new Error("Failed to fetch attendance");
  }
  return response.data;
};

export const fetchAttendanceById = async (attendanceId: string) => {
  const response = await apiClient.get(`/attendance/${attendanceId}`);
  if (!response.data) {
    throw new Error("Failed to fetch attendance data");
  }
  return response.data;
};

export const updateAttendance = async (
  attendanceId: string,
  data: Partial<RecordAttendanceData>
) => {
  const response = await apiClient.put(`/attendance/${attendanceId}`, data);
  if (!response.data) {
    throw new Error("Failed to update attendance");
  }
  return response.data;
};

export const deleteAttendance = async (attendanceId: string) => {
  const response = await apiClient.delete(`/attendance/${attendanceId}`);
  if (!response.data) {
    throw new Error("Failed to delete attendance");
  }
  return response.data;
};

export const getAttendanceReports = async (filters?: AttendanceFilters) => {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value) {
        queryParams.append(key, value);
      }
    });
  }

  const url = filters && Object.keys(filters).length > 0
    ? `/attendance/reports?${queryParams}`
    : "/attendance/reports";
  
  const response = await apiClient.get(url);
  if (!response.data) {
    throw new Error("Failed to fetch attendance reports");
  }
  return response.data;
};

