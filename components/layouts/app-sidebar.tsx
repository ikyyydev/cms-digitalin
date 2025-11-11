import prismadb from "@/common/libs/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import MobileMainNav from "@/components/fragments/MobileMainNav";
import StoreSwitcher from "@/components/fragments/StoreSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export async function AppSidebar() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <Sidebar>
      <SidebarContent className="p-3">
        <SidebarGroup className="space-y-3">
          <SidebarGroupLabel className="flex items-center text-xl mb-5 text-foreground font-bold">
            Digitalin
            <SidebarTrigger className="ml-auto md:hidden" />
          </SidebarGroupLabel>

          <Separator />

          <StoreSwitcher
            items={store}
            className="w-full text-muted-foreground"
          />

          <SidebarGroupContent className="block lg:hidden">
            <MobileMainNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
