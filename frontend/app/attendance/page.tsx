import AttendancePageUI from "@/components/attendance/attendance-page-ui";
import { fetchMembers } from "../actions/members.action";
import { fetchEvents } from "../actions/events.action";

export default async function AttendancePage() {
  const { data: members, isLoading, isError } = await fetchMembers({});
  const { data: events } = await fetchEvents({});

  // console.log(members);
  // console.log(events);
  return <AttendancePageUI members={members || []} events={events || []} />;
}
