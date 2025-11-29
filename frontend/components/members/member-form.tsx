"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { CreateMemberData, Department, Member } from "@/lib/types";
import { createMember } from "@/app/actions/members.action";
import { fetchDepartments } from "@/app/actions/departments.action";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
// import { toast } from "sonner";
// import type { Member } from "@/lib/types";
// import type {
//   CreateMemberData,
//   UpdateMemberData,
// } from "@/app/actions/members.action";
// import { createMember, updateMember } from "@/app/actions/members.action";
// import { fetchDepartments } from "@/app/actions/departments.action";
// import type { Department } from "@/lib/types";

interface MemberFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // member?: Member | null;
  // memberData:Member
}

const formSchema = z.object({
  firstname: z.string().min(2, { message: "First name is required" }),
  lastname: z.string().min(2, { message: "Last name is required" }),
  other_names: z.string().optional(),
  phone: z.string().max(10, { message: "must be maximum 10 characters" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  address: z.string({ message: "Address is required" }).optional(),
  memberType: z.enum(["regular", "visitor"], {
    message: "Member type is required",
  }),
  department: z.string().optional(),
  isHead: z.boolean(),
});

type formFields = z.infer<typeof formSchema>;

export function MemberForm({ departments }: { departments: Department[] }) {
  // open,
  // onOpenChange,
  // member,
  // memberData,
  // onSuccess,
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [departments, setDepartments] = useState<Department[]>([]);
  // const [formData, setFormData] = useState<CreateMemberData>({
  //   firstname: "",
  //   lastname: "",
  //   other_names: "",
  //   phone: "",
  //   address: "",
  //   gender: "",
  //   memberType: "regular",
  //   department_id: null,
  //   isHead: false,
  // });

  // useEffect(() => {
  //   if (member) {
  //     setFormData({
  //       firstname: member.firstname || "",
  //       lastname: member.lastname || "",
  //       other_names: member.other_names || "",
  //       phone: member.phone || "",
  //       address: member.address || "",
  //       gender: member.gender || "",
  //       memberType: member.memberType || "regular",
  //       department_id: member.department_id || null,
  //       isHead: member.isHead || false,
  //     });
  //   } else {
  //     setFormData({
  //       firstname: "",
  //       lastname: "",
  //       other_names: "",
  //       phone: "",
  //       address: "",
  //       gender: "",
  //       memberType: "regular",
  //       department_id: null,
  //       isHead: false,
  //     });
  //   }
  // }, [member, open]);

  // useEffect(() => {
  //   const loadDepartments = async () => {
  //     try {
  //       const result = await fetchDepartments({});
  //       if (result.data) {
  //         setDepartments(result.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load departments:", error);
  //     }
  //   };
  //   if (open) {
  //     loadDepartments();
  //   }
  // }, [open]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     if (member) {
  //       const updateData: UpdateMemberData = {
  //         id: member.id,
  //         ...formData,
  //       };
  //       await updateMember(updateData);
  //       toast.success("Member updated successfully");
  //     } else {
  //       await createMember(formData);
  //       toast.success("Member created successfully");
  //     }
  //     onOpenChange(false);
  //     onSuccess?.();
  //     router.refresh();
  //   } catch (error: any) {
  //     toast.error(error.message || "Failed to save member");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<formFields> = async (formData) => {
    const memberData: CreateMemberData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      other_names: formData.other_names || "",
      phone: formData.phone,
      address: formData.address || "",
      gender: formData.gender,
      memberType: formData.memberType,
      department_id: formData.department || null,
      isHead: formData.isHead,
    };
    try {
      const memberCreate = await createMember(memberData);
      console.log("Member created successfully", memberCreate);
    } catch (error) {
      console.error("Failed to create member:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle> Add New Member</DialogTitle>

            <DialogDescription>
              Fill in the details to add a new member to the system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("firstname")}
                  id="firstname"
                  type="text"
                  required
                  placeholder="John"
                />
                {errors.firstname && (
                  <span className="text-red-500">
                    {errors.firstname.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("lastname")}
                  id="lastname"
                  type="text"
                  required
                  placeholder="Doe"
                />
                {errors.lastname && (
                  <span className="text-red-500">
                    {errors.lastname.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="other_names">Other Names</Label>
              <Input
                {...register("other_names")}
                id="other_names"
                type="text"
                placeholder="Middle name or nickname"
              />
              {errors.other_names && (
                <span className="text-red-500">
                  {errors.other_names.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="text"
                  {...register("phone")}
                  required
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <select
                  {...register("gender")}
                  // value={formData.gender}
                  required
                >
                  {/* <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger> */}
                  <option value="default">--select gender--</option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500">{errors.gender.message}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                type="text"
                placeholder="Street address, City, State"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberType">
                  Member Type <span className="text-red-500">*</span>
                </Label>
                <select {...register("memberType")} required>
                  <option value="regular">Regular</option>
                  <option value="visitor">Visitor</option>
                </select>
                {errors.memberType && (
                  <span className="text-red-500">
                    {errors.memberType.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <select {...register("department")}>
                  <option value="none">None</option>
                  {departments.map((dept: Department) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Input id="isHead" {...register("isHead")} type="checkbox" />
              <Label
                htmlFor="isHead"
                className="text-sm font-normal cursor-pointer"
              >
                Department Head
              </Label>
              {errors.isHead && (
                <span className="text-red-500">{errors.isHead.message}</span>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
