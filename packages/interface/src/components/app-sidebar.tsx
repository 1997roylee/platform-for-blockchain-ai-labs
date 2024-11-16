"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Thread } from "@prisma/client";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

export function AppSidebar() {
  const { isPending, data } = useQuery({
    queryKey: ["Threads"],
    queryFn: async () => {
      const response = await fetch("/api/threads");
      return response.json() as unknown as Thread[];
    },
  });

  console.log("data", data);
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {data?.map((thread) => (
            <div key={thread.id} className="flex p-3 items-center">
              <div className="w-12">
                <AspectRatio ratio={1}>
                  {/* <Image src={thread.icon} alt={thread.name} layout="fill" /> */}
                </AspectRatio>
              </div>
            </div>
          ))}
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
