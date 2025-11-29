// "use client";

import { MemberForm } from "@/components/members/member-form";
import type { Department } from "@/lib/types";

export function MembersPageClient({ depts }: { depts: Department[] }) {
  // const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <MemberForm
        departments={depts}
        // member
        // open={formOpen}
        // onOpenChange={setFormOpen}
        // memberData={}
      />
    </>
  );
}
