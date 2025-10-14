"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";

const UserButtonClient = () => {
  return (
    <div className="ml-auto flex items-center space-x-4">
      <UserButton />
    </div>
  );
};

export default UserButtonClient;
