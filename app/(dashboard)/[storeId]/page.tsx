import prismadb from "@/common/libs/prisma";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeId } = await params;
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return (
    <div>
      <h1>This is a dashbaord</h1>
      <h1>Active Store: {store?.name}</h1>
    </div>
  );
};

export default DashboardPage;
