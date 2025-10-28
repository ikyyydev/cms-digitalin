import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";

import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import { RenderMounted } from "@/components/layouts/client-render";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Digitalin",
  description: "Admin dashboard for Digitalin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${montserrat.variable} antialiased`}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
