import React from "react";
import { MainNav } from "@/components/fragments/MainNav";
import StoreSwitcher from "@/components/fragments/StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/common/libs/prisma";
import UserButtonClient from "../ui/user-button-client";

const Navbar = async () => {
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
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <StoreSwitcher items={store} />

        <MainNav />

        <UserButtonClient />
      </div>
    </div>
  );
};

export default Navbar;
