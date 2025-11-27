import { prisma } from "../db/db.js";
import { getUpcomingRange } from "../utils/dateUtils.js";
export const addEventService = async (eventData) => {
  const { name, date, startTime, endTime } = eventData;

  if (!name?.trim()) {
    throw new Error("Event name is required!");
  }

  if (!date?.trim()) {
    throw new Error("Event date is required!");
  }

  if (!startTime?.trim()) {
    throw new Error("Start time is required!");
  }

  if (!endTime?.trim()) {
    throw new Error("End time is required!");
  }

  const existingEvent = await prisma.event.findUnique({
    where: { name: name.trim() },
  });

  if (existingEvent) {
    throw new Error("Event already exists!");
  }

  const processedData = {
    ...eventData,
    date: new Date(eventData.date),
    endDate: eventData.endDate ? new Date(eventData.endDate) : null,
  };

  const newEvent = await prisma.event.create({
    data: processedData,
    include: { attendances: true },
  });

  return {
    message: `Event "${eventData.name}" created successfully!`,
    data: newEvent,
  };
};

export const allEventsService = async () => {
  const events = await prisma.event.findMany({
    include: { attendances: true },
    orderBy: { date: "asc" },
  });

  return { message: "All events", data: events };
};

export const filterEventsService = async (filters = {}) => {
  const where = {};
  if (filters.name) where.name = { contains: filters.name };
  if (filters.startDate) where.date = { gte: new Date(filters.startDate) };
  if (filters.endDate) where.endDate = { lte: new Date(filters.endDate) };

  const filteredEvents = await prisma.event.findMany({
    where,
    include: { attendances: true },
  });

  return { message: "Filtered events", data: filteredEvents };
};

export const singleEventService = async ({ id }) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { attendances: true },
  });

  if (!event) {
    throw new Error("Event does not exist!");
  }

  return { message: `Event "${event.name}" data`, data: event };
};

export const upcomingEventsService = async () => {
  const upcomingEvents = await prisma.event.findMany({
    where: {
      date: getUpcomingRange(30),
    },
    orderBy: { date: "asc" },
    include: { attendances: true },
  });
  return { message: "Upcoming events (30days)", data: upcomingEvents };
};

export const updateEventService = async ({ id }, updateData) => {
  const eventExists = await prisma.event.findUnique({ where: { id } });

  if (!eventExists) {
    throw new Error("Event does not exist!");
  }
  const processedData = { ...updateData };
  if (updateData.date) processedData.date = new Date(updateData.date);
  if (updateData.endDate) processedData.endDate = new Date(updateData.endDate);

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: processedData,
    include: { attendances: true },
  });

  return { message: "Event updated successfully", data: updatedEvent };
};

export const deleteEventService = async ({ id }) => {
  const deletedEvent = await prisma.event.delete({
    where: { id },
  });

  return { message: "Event deleted successfully", data: deletedEvent };
};
