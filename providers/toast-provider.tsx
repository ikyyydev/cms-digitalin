"use client";

import { Toaster } from "sonner";

export const ToastProvider = () => {
  return <Toaster position="top-right" toastOptions={{ duration: 2500 }} />;
};
