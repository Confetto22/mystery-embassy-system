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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { fetchAttendance } from "@/app/actions/attendance.action";
import { fetchEvents } from "@/app/actions/events.action";
import { fetchDepartments } from "@/app/actions/departments.action";
import type { Attendance } from "@/lib/types";

export default function AttendanceHistoryPage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    eventId: "",
    departmentId: "",
    startDate: "",
    endDate: "",
  });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (startDate) {
      setFilters({ ...filters, startDate: format(startDate, "yyyy-MM-dd") });
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setFilters({ ...filters, endDate: format(endDate, "yyyy-MM-dd") });
    }
  }, [endDate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [attendanceResult, eventsResult, departmentsResult] =
        await Promise.all([
          fetchAttendance(filters),
          fetchEvents(),
          fetchDepartments({}),
        ]);
      if (attendanceResult.data) {
        setAttendance(attendanceResult.data);
      }
      if (eventsResult.data) {
        setEvents(eventsResult.data);
      }
      if (departmentsResult.data) {
        setDepartments(departmentsResult.data);
      }
    } catch (error) {
      toast.error("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = () => {
    const processedFilters = {
      ...filters,
      eventId: filters.eventId === "all" ? "" : filters.eventId,
      departmentId: filters.departmentId === "all" ? "" : filters.departmentId,
    };
    loadData();
  };

  const clearFilters = () => {
    setFilters({
      eventId: "",
      departmentId: "",
      startDate: "",
      endDate: "",
    });
    setStartDate(undefined);
    setEndDate(undefined);
    loadData();
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Attendance History</h1>
        <p className="text-gray-600">View and filter attendance records</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event">Event</Label>
              <Select
                value={filters.eventId}
                onValueChange={(value) => {
                  setFilters({ ...filters, eventId: value });
                }}
              >
                <SelectTrigger id="event">
                  <SelectValue placeholder="All events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={filters.departmentId}
                onValueChange={(value) => {
                  setFilters({ ...filters, departmentId: value });
                }}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleFilterChange}>Apply Filters</Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance Records ({attendance.length})</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : attendance.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No attendance records found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.firstname} {record.lastname}
                    </TableCell>
                    <TableCell>
                      {record.event?.name || record.service?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(record.date), "PPP")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          record.attendance_status === "present"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : record.attendance_status === "late"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {record.attendance_status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.time || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
