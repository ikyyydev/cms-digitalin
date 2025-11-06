import prismadb from "@/common/libs/prisma";
import { StorageForm } from "./components/storage-form";

const StoragePage = async ({ params }: { params: { storageId: string } }) => {
  const { storageId } = await params;
  const storage = await prismadb.storage.findUnique({
    where: {
      id: storageId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <StorageForm initialData={storage} />
      </div>
    </div>
  );
};

export default StoragePage;
