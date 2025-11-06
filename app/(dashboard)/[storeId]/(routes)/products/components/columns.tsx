"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Storage } from "@/app/generated/prisma";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
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
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
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
