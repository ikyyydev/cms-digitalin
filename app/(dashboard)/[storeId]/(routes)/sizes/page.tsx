import { format } from "date-fns";

import prismadb from "@/common/libs/prisma";

import { SizeClient } from "./components/client";
import { SizesColumn } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;

  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizesColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "yyyy-MM-dd", {
      useAdditionalDayOfYearTokens: true,
    }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
