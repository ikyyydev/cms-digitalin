import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/fragments/MainNav";
import UserButtonClient from "../ui/user-button-client";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger />

        <MainNav />

        <UserButtonClient />
      </div>
    </div>
  );
};

export default Navbar;
