import { format } from "date-fns";

import prismadb from "@/common/libs/prisma";

import { StoragesClient } from "./components/client";
import { StorageColumn } from "./components/columns";

const StoragesPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;

  const storages = await prismadb.storage.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedStorages: StorageColumn[] = storages.map((item) => ({
    id: item.id,
    value: item.value,
    createdAt: format(item.createdAt, "yyyy-MM-dd", {
      useAdditionalDayOfYearTokens: true,
    }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StoragesClient data={formattedStorages} />
      </div>
    </div>
  );
};

export default StoragesPage;
