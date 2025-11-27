import { prisma } from "../db/db.js";

export const addServiceService = async (serviceData) => {
  const { name, dayOfWeek, startTime, endTime } = serviceData;

  if (!name?.trim()) {
    throw new Error("Service name is required!");
  }

  if (!dayOfWeek?.trim()) {
    throw new Error("Day of week is required!");
  }

  if (!startTime?.trim()) {
    throw new Error("Start time is required!");
  }

  if (!endTime?.trim()) {
    throw new Error("End time is required!");
  }

  const existingService = await prisma.service.findUnique({
    where: { name: name.trim() },
  });

  if (existingService) {
    throw new Error("Service already exists!");
  }

  const newService = await prisma.service.create({
    data: {
      name: name.trim(),
      dayOfWeek: dayOfWeek.toLowerCase().trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
    },
    include: { attendances: true },
  });

  return {
    message: `Service "${serviceData.name}" created successfully!`,
    data: newService,
  };
};

export const allServicesService = async () => {
  const services = await prisma.service.findMany({
    include: { attendances: true },
    orderBy: { name: "asc" },
  });

  return { message: "All services", data: services };
};

export const singleServiceService = async ({ id }) => {
  const service = await prisma.service.findUnique({
    where: { id },
    include: { attendances: true },
  });

  if (!service) {
    throw new Error("Service does not exist!");
  }

  return { message: `Service "${service.name}" data`, data: service };
};

export const updateServiceService = async ({ id }, updateData) => {
  const serviceExists = await prisma.service.findUnique({ where: { id } });

  if (!serviceExists) {
    throw new Error("Service does not exist!");
  }

  const updatedService = await prisma.service.update({
    where: { id },
    data: updateData,
    include: { attendances: true },
  });

  return { message: "Service updated successfully", data: updatedService };
};

export const deleteServiceService = async ({ id }) => {
  const deletedService = await prisma.service.delete({
    where: { id },
  });

  return { message: "Service deleted successfully", data: deletedService };
};