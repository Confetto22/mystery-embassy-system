import { prisma } from "../db/db.js";
import { getDateRange } from "../utils/dateUtils.js";

export const checkinService = async (attendanceData) => {
  const { serviceName, eventName, ...cleanAttendanceData } = attendanceData;
  const trimmedPhone = attendanceData.phone.trim();
  let service_id = null;
  let event_id = null;

  // Validate that only one is provided

  if (serviceName && eventName) {
    throw new Error("Cannot select both service and event!");
  }
  if (!serviceName.trim() && !eventName.trim()) {
    throw new Error("select either service or event!");
  }

  if (serviceName) {
    const service = await prisma.service.findUnique({
      where: {
        name: serviceName,
      },
    });
    service_id = service.id;
  } else if (eventName) {
    const event = await prisma.event.findUnique({
      where: {
        name: eventName,
      },
    });
    event_id = event.id;
  }

  // Check if that event/service is happening on that day

  // Check if Person exists in the system
  const found = await prisma.member.findUnique({
    where: {
      phone: trimmedPhone,
    },
  });

  // Check if person has checked in today
  const todayRange = getDateRange();

  const checkedIn = await prisma.attendance.findFirst({
    where: {
      AND: [{ phone: trimmedPhone }, { date: todayRange }],
    },
  });
  if (checkedIn) {
    throw new Error(`${checkedIn.firstname} already checked in today!`);
  }

  if (found) {
    // validate the credentials of that member
    const validMember = await prisma.member.findFirst({
      where: {
        AND: [
          { firstname: attendanceData.firstname },
          { lastname: attendanceData.lastname },
          { memberType: attendanceData.memberType },
          { phone: attendanceData.phone },
        ],
      },
    });

    if (!validMember) {
      throw new Error("wrong credentials");
    }

    const newAttendance = await prisma.attendance.create({
      data: {
        ...cleanAttendanceData,
        member_phone: trimmedPhone,
        service_id: service_id || null,
        event_id: event_id || null,
        attendance_status: "present",
      },
    });
    return {
      message: `Welcome ${attendanceData.firstname}`,
      data: newAttendance,
    };
  }
  // Create new member and set memberType to visitor/guest
  const visitor = await prisma.member.create({
    data: {
      firstname: attendanceData.firstname,
      lastname: attendanceData.lastname,
      address: attendanceData.address,
      phone: attendanceData.phone,
      memberType: "visitor",
    },
  });

  // Check the guest in to service

  const visitorCheckin = await prisma.attendance.create({
    data: {
      ...cleanAttendanceData,
      member_phone: attendanceData.phone,
      attendance_status: "present",
    },
  });
  return { message: "Welcome to MEI", visitor, data: visitorCheckin };
};

export const getAttendanceService = async () => {
  const attendance = await prisma.attendance.findMany({
    include: {
      member: true,
      service: true,
      event: true,
    },
  });
  return { message: "All attendance records", data: attendance };
};

export const filteredAttendanceService = async (filters = {}) => {
  const where = {};

  if (filters.date) {
    where.date = getDateRange(filters.date);
  }
  if (filters.memberType) where.member = { memberType: filters.memberType };
  if (filters.phone) where.phone = filters.phone;
  if (filters.firstname) where.firstname = filters.firstname;
  if (filters.lastname) where.lastname = filters.lastname;
  if (filters.address) where.address = filters.address;
  if (filters.serviceId) where.serviceId = parseInt(filters.serviceId);
  if (filters.eventId) where.eventId = parseInt(filters.eventId);

  const filteredAttendance = await prisma.attendance.findMany({
    where,
    include: {
      member: true,
      service: true,
      event: true,
    },
  });
  return { message: "Filtered attendance records", data: filteredAttendance };
};

export const singleAttendanceService = async ({ personId }) => {
  // Check existence of person
  const person = await prisma.member.findUnique({
    where: {
      id: personId,
    },
  });
  if (!person) {
    throw new Error("Person does not exist!");
  }
  const personAttendance = await prisma.attendance.findMany({
    where: {
      member_phone: person.phone,
    },
    include: {
      member: true,
      event: true,
      service: true,
    },
  });
  return {
    message: `${person.firstname} ${person.lastname} attendance records!`,
    data: personAttendance,
    count: personAttendance.length,
  };
};
