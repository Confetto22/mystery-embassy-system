"use client";

import {
  Briefcase,
  ShoppingBag,
  FileText,
  Users,
  LayoutDashboard,
  UserCheck,
  ClipboardCheck,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  // const [selectedItem, setSelectedItem] = useState("");
  const pathname = usePathname();
  // const [pagesOpen, setPagesOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      refLink: "/dashboard",
    },
    {
      title: "Members",
      icon: Users,
      refLink: "/members",
    },
    {
      title: "Ministry",
      icon: ShoppingBag,
      refLink: "/departments",
    },
    {
      title: "Events",
      icon: FileText,
      refLink: "/events",
    },
    {
      title: "Attendance",
      icon: UserCheck,
      refLink: "/attendance",
    },
    {
      title: "Record Attendance",
      icon: ClipboardCheck,
      refLink: "/attendance/record",
    },
    {
      title: "Settings",
      icon: Settings,
      refLink: "/settings",
    },
  ];
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="font-semibold text-lg">Dasher</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start ${
                      pathname === item.refLink
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => pathname === item.refLink}
                  >
                    <Link href={item.refLink}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile at Bottom */}
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-200 text-gray-700">
              JC
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              Jitu Chauhan
            </div>
            <div className="text-xs text-gray-500 truncate">
              Free Version - 1 Month
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
