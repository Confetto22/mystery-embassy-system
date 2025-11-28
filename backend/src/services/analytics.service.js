import { prisma } from "../db/db.js";
import { getUpcomingRange } from "../utils/dateUtils.js";

export const analyticsService = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 9999);
  let dayOfWeek = new Date().getDay();
  switch (dayOfWeek) {
    case 0:
      dayOfWeek = "sunday";
      break;
    case 1:
      dayOfWeek = "monday";
      break;
    case 2:
      dayOfWeek = "tuesday";
      break;
    case 3:
      dayOfWeek = "wednesday";
      break;
    case 4:
      dayOfWeek = "thursday";
      break;
    case 5:
      dayOfWeek = "friday";
      break;
    case 6:
      dayOfWeek = "saturday";
      break;
  }
  // console.log(dayOfWeek);

  const [
    totalMembers,
    todayEvent,
    todayService,
    // newMembers,
    firstTimers,
    upcomingEvts,
    presentToday,
    genders,
    deptPopulation,
  ] = await Promise.all([
    prisma.member.findMany({ where: { memberType: "regular" } }),
    prisma.event.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    }),
    prisma.service.findMany({
      where: {
        dayOfWeek: dayOfWeek,
      },
      include: { attendances: true },
    }),

    prisma.member.findMany({ where: { memberType: "visitor" } }),
    prisma.event.findMany({
      where: { date: getUpcomingRange(30) },
      orderBy: { date: "asc" },
      include: { attendances: true },
    }),
    prisma.attendance.findMany({
      where: {
        AND: [
          { attendance_status: "present" },
          {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        ],
      },
    }),
    prisma.member.groupBy({
      by: ["gender"],
      _count: { id: true },
    }),
    prisma.department.findMany({
      include: {
        _count: { select: { members: true } },
        members: {
          where: {
            isHead: true,
          },
          select: {
            isHead: true,
            firstname: true,
            lastname: true,
            phone: true,
          },
        },
      },
    }),
  ]);

  return {
    totalMembers,
    todayEvent,
    todayService,
    firstTimers,
    upcomingEvts,
    presentToday,
    genders,
    deptPopulation,
  };
};
