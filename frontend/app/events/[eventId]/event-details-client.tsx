"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Download } from "lucide-react";
import { EventForm } from "@/components/events/event-form";
import { deleteEvent } from "@/app/actions/events.action";
import { toast } from "sonner";
import type { Event } from "@/lib/types";

export function EventDetailsClient({ event }: { event: Event }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteEvent(event.id);
      toast.success("Event deleted successfully");
      router.push("/events");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setFormOpen(true)}
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      <Button
        variant="outline"
        className="gap-2 text-red-600 hover:text-red-700"
        onClick={handleDelete}
        disabled={deleting}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <EventForm
        open={formOpen}
        onOpenChange={setFormOpen}
        event={event}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}

