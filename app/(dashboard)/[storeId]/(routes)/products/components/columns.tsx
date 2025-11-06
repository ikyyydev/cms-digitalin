"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Color, Storage } from "@/app/generated/prisma";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size?: string;
  colors: Color[];
  storages: Storage[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) =>
      row.original.colors.map((color) => color.name).join(", "),
  },
  {
    accessorKey: "storages",
    header: "Storage",
    cell: ({ row }) =>
      row.original.storages.map((storage) => storage.value).join(", "),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
