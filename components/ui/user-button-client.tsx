"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";

import { RenderMounted } from "../layouts/client-render";

const UserButtonClient = () => {
  return (
    <RenderMounted>
      <div className="ml-auto flex items-center space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </RenderMounted>
  );
};

export default UserButtonClient;
