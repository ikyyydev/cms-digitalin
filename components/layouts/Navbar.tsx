import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/common/libs/prisma";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/fragments/MainNav";
import StoreSwitcher from "@/components/fragments/StoreSwitcher";
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
        {/* <div className="ml-auto flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
