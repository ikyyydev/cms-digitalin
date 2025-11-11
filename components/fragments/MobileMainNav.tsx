"use client";

import { useParams, usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/common/libs/utils";

const MobileMainNav: React.FC = () => {
  const pathname = usePathname();
  const params = useParams();

  if (!params?.storeId) {
    return null;
  }

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/storages`,
      label: "Storage",
      active: pathname === `/${params.storeId}/storages`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <SidebarMenu>
      {routes.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton asChild>
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                item.active
                  ? "text-primary dark:text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default MobileMainNav;
