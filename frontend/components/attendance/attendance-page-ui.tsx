"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { fetchMembers } from "@/app/actions/members.action";
import { fetchEvents } from "@/app/actions/events.action";
import {
  recordAttendance,
  bulkRecordAttendance,
} from "@/app/actions/attendance.action";
import type { Member } from "@/lib/types";
import type { Event } from "@/lib/types";

export default function AttendancePageData({
  members,
  events,
}: {
  members: Member[];
  events: Event[];
}) {
  //   const [members, setMembers] = useState<Member[]>([]);
  //   const [events, setEvents] = useState<Event[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState<
    "present" | "absent" | "late"
  >("present");
  //   const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  //   useEffect(() => {
  //     const loadData = async () => {
  //       setLoading(true);
  //       try {
  //         const [membersResult, eventsResult] = await Promise.all([
  //           fetchMembers({}),
  //           fetchEvents(),
  //         ]);
  //         if (membersResult.data) {
  //           setMembers(membersResult.data);
  //           setFilteredMembers(membersResult.data);
  //         }
  //         if (eventsResult.data) {
  //           setEvents(eventsResult.data);
  //         }
  //       } catch (error) {
  //         toast.error("Failed to load data");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     loadData();
  //   }, []);

  //   useEffect(() => {
  //     if (searchQuery.trim() === "") {
  //       setFilteredMembers(members);
  //     } else {
  //       const query = searchQuery.toLowerCase();
  //       const filtered = members.filter(
  //         (member) =>
  //           member.firstname.toLowerCase().includes(query) ||
  //           member.lastname.toLowerCase().includes(query) ||
  //           member.phone.includes(query)
  //       );
  //       setFilteredMembers(filtered);
  //     }
  //   }, [searchQuery, members]);

  const toggleMemberSelection = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const selectAll = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map((m) => m.id)));
    }
  };

  const handleRecordAttendance = async () => {
    if (!selectedEvent) {
      toast.error("Please select an event");
    }
  };

  //     if (selectedMembers.size === 0) {
  //       toast.error("Please select at least one member");
  //       return;
  //     }

  //     setRecording(true);
  //     try {
  //       await bulkRecordAttendance({
  //         memberIds: Array.from(selectedMembers),
  //         eventId: selectedEvent,
  //         attendance_status: attendanceStatus,
  //         date: format(selectedDate, "yyyy-MM-dd"),
  //       });
  //       toast.success(
  //         `Attendance recorded for ${selectedMembers.size} member(s)`
  //       );
  //       setSelectedMembers(new Set());
  //     } catch (error: any) {
  //       toast.error(error.message || "Failed to record attendance");
  //     } finally {
  //       setRecording(false);
  //     }
  //   };

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Record Attendance</h1>
        <p className="text-gray-600">
          Mark attendance for members at events or services
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Event Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event">Select Event</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger id="event">
                  <SelectValue placeholder="Choose an event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name} - {format(new Date(event.date), "PP")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Attendance Status</Label>
              <Select
                value={attendanceStatus}
                onValueChange={(value: "present" | "absent" | "late") =>
                  setAttendanceStatus(value)
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md md:col-span-2">
          <CardHeader>
            <CardTitle>Select Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedMembers.size} of {filteredMembers.length} selected
              </p>
              <Button variant="outline" size="sm" onClick={selectAll}>
                {selectedMembers.size === filteredMembers.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          filteredMembers.length > 0 &&
                          selectedMembers.size === filteredMembers.length
                        }
                        onCheckedChange={selectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMembers.has(member.id)}
                          onCheckedChange={() =>
                            toggleMemberSelection(member.id)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.firstname} {member.lastname}
                      </TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.department?.name || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.memberType}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button
              className="w-full"
              onClick={handleRecordAttendance}
              disabled={
                recording || selectedMembers.size === 0 || !selectedEvent
              }
            >
              {recording ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Recording...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Record Attendance ({selectedMembers.size})
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
