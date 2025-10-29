"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";

import { RenderMounted } from "../layouts/client-render";
import { ModeToggle } from "./theme-toggle";

const UserButtonClient = () => {
  return (
    <RenderMounted>
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </RenderMounted>
  );
};

export default UserButtonClient;
