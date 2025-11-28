"use server";

import apiClient from "@/lib/api-client";

export const fetchEvents = async () => {
  const response = await apiClient.get("/events/all");
  if (!response.data) {
    throw new Error("Failed to fetch events");
  }
  const result = response.data;
  return result;
};
