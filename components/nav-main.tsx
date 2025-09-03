"use client";

import {
  IconAi,
  IconCirclePlusFilled,
  IconSettings,
  IconTags,
} from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconDashboard, IconListDetails } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
export function NavMain() {
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "My Collections",
      url: "/collections",
      icon: IconListDetails,
    },
    {
      title: "Tags",
      url: "/tags",
      icon: IconTags,
    },
    {
      title: "AI Assistant",
      url: "/ai-assistant",
      icon: IconAi,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item, i) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn({
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear":
                    i === 0,
                })}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
