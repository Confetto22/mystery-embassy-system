"use server";

import apiClient from "@/lib/api-client";
// import axios from "axios";

// const baseURL = process.env.API_BASE_URL || "http://localhost:5000/api";
export const fetchOverviewData = async () => {
  const response = await apiClient.get("/overview");

  if (!response.data) {
    throw new Error("Failed to fetch overview data");
  }

  const result = response.data;
  return result;
};
