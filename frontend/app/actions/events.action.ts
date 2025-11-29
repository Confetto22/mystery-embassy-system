"use server";

import apiClient from "@/lib/api-client";
import type { Event } from "@/lib/types";

export interface CreateEventData {
  name: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  type?: string;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export const fetchEvents = async (filters?: {
  date?: string;
  type?: string;
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

  const url = filters && Object.keys(filters).length > 0
    ? `/events/all?${queryParams}`
    : "/events/all";
  
  const response = await apiClient.get(url);
  if (!response.data) {
    throw new Error("Failed to fetch events");
  }
  const result = response.data;
  return result;
};

export const fetchEventById = async (eventId: string) => {
  const response = await apiClient.get(`/events/${eventId}`);
  if (!response.data) {
    throw new Error("Failed to fetch event data");
  }
  return response.data;
};

export const createEvent = async (data: CreateEventData) => {
  const response = await apiClient.post("/events", data);
  if (!response.data) {
    throw new Error("Failed to create event");
  }
  return response.data;
};

export const updateEvent = async (data: UpdateEventData) => {
  const { id, ...updateData } = data;
  const response = await apiClient.put(`/events/${id}`, updateData);
  if (!response.data) {
    throw new Error("Failed to update event");
  }
  return response.data;
};

export const deleteEvent = async (eventId: string) => {
  const response = await apiClient.delete(`/events/${eventId}`);
  if (!response.data) {
    throw new Error("Failed to delete event");
  }
  return response.data;
};
