import prismadb from "@/common/libs/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/layouts/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-3 bg-muted/30">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
