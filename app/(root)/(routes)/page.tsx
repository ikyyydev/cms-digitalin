"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (isOpen) {
    return null;
  }

  return (
    <div className="p-4">
      <UserButton />
      Root Page
    </div>
  );
};

export default SetupPage;
