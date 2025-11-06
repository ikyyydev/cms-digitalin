"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { StorageColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface StoragesClientProps {
  data: StorageColumn[];
}

export const StoragesClient: React.FC<StoragesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex flex-wrap space-y-3 items-center justify-between">
        <Heading
          title={`Storages (${data.length})`}
          description="Manage storage for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/storages/new`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="value" columns={columns} data={data} />

      <Heading title="API" description="API calls for Storages" />
      <Separator />
      <ApiList entityName="storages" entityIdName="storageId" />
    </>
  );
};
