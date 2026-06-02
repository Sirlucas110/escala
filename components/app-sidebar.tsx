"use client";

import * as React from "react";

import UnityLogo from "@/app/ui/unity_logo";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Calendar,
  LayoutGrid,
  Users
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    
  },
  teams: [
    {
      name: "Escola Sabatina",
      logo: UnityLogo,
      plan: "Jovem",
    },
  ],
  navMain: [
    {
      title: "Escalas",
      url: "/escalas",
      icon: Calendar,
    },
    {
      title: "Membros",
      url: "/escalas/membros",
      icon: Users,
    },
    {
      title: "Setor",
      url: "/escalas/setor",
      icon: LayoutGrid,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
