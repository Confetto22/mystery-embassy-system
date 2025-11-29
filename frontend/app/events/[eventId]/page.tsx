import { fetchEventById } from "@/app/actions/events.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { EventForm } from "@/components/events/event-form";
import { EventDetailsClient } from "./event-details-client";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  const { data: event } = await fetchEventById(eventId);

  if (!event) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-gray-500 mb-4">
            The event you are looking for does not exist.
          </p>
          <Button asChild>
            <Link href="/events">Go Back to Events</Link>
          </Button>
        </div>
      </main>
    );
  }

  const eventDate = event.date ? new Date(event.date) : null;
  const eventEndDate = event.endDate ? new Date(event.endDate) : null;

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/events">Events</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{event.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {event.name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4">
                {eventDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{format(eventDate, "PPP")}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                {event.attendances && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendances.length} Attendee
                      {event.attendances.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <EventDetailsClient event={event} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Event Name</p>
              <p className="font-semibold text-gray-900">{event.name}</p>
            </div>
            {eventDate && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Date</p>
                <p className="font-semibold text-gray-900">
                  {format(eventDate, "PPP")}
                </p>
              </div>
            )}
            {eventEndDate && (
              <div>
                <p className="text-sm text-gray-600 mb-1">End Date</p>
                <p className="font-semibold text-gray-900">
                  {format(eventEndDate, "PPP")}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Time</p>
              <p className="font-semibold text-gray-900">
                {event.startTime} - {event.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Created</p>
              <p className="font-semibold text-gray-900">
                {format(new Date(event.created_at), "PPP")}
              </p>
            </div>
          </CardContent>
        </Card>

        {event.attendances && event.attendances.length > 0 && (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Attendance ({event.attendances.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {event.attendances.slice(0, 5).map((attendance: any) => (
                    <TableRow key={attendance.id}>
                      <TableCell className="font-medium">
                        {attendance.firstname} {attendance.lastname}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            attendance.attendance_status === "present"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {attendance.attendance_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(attendance.date), "PP")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {event.attendances.length > 5 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href={`/attendance?eventId=${event.id}`}>
                      View All Attendance
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default EventDetails;
