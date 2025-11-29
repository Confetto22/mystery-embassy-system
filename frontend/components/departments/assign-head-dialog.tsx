"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { assignDepartmentHead } from "@/app/actions/departments.action";
import { fetchMembers } from "@/app/actions/members.action";
import type { Member } from "@/lib/types";

interface AssignHeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
  currentHeadId?: string;
  onSuccess?: () => void;
}

export function AssignHeadDialog({
  open,
  onOpenChange,
  departmentId,
  currentHeadId,
  onSuccess,
}: AssignHeadDialogProps) {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  useEffect(() => {
    if (open) {
      loadMembers();
      setSelectedMemberId(currentHeadId || "");
    }
  }, [open, currentHeadId]);

  const loadMembers = async () => {
    try {
      const result = await fetchMembers({ departmentId });
      if (result.data) {
        setMembers(result.data);
      }
    } catch (error) {
      console.error("Failed to load members:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) {
      toast.error("Please select a member");
      return;
    }

    setLoading(true);
    try {
      await assignDepartmentHead({
        departmentId,
        memberId: selectedMemberId,
      });
      toast.success("Department head assigned successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to assign department head");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Department Head</DialogTitle>
          <DialogDescription>
            Select a member to assign as the head of this department.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Select Member</Label>
            <Select
              value={selectedMemberId}
              onValueChange={setSelectedMemberId}
              required
            >
              <SelectTrigger id="member">
                <SelectValue placeholder="Choose a member" />
              </SelectTrigger>
              <SelectContent>
                {members.length === 0 ? (
                  <SelectItem value="" disabled>
                    No members in this department
                  </SelectItem>
                ) : (
                  members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.firstname} {member.lastname}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || members.length === 0}>
              {loading ? "Assigning..." : "Assign Head"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

