"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EventForm } from "@/components/events/event-form";

export function EventsPageClient() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setFormOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Create Event
      </Button>
      <EventForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </>
  );
}

