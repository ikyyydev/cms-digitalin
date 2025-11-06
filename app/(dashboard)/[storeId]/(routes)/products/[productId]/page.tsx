import prismadb from "@/common/libs/prisma";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const { productId, storeId } = await params;
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      storages: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
  });
  const storages = await prismadb.storage.findMany({
    where: {
      storeId,
    },
  });

  const formattedProduct = product
    ? {
        ...product,
        price: product.price.toNumber(),
        storages: product.storages,
      }
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm
          initialData={formattedProduct}
          categories={categories}
          sizes={sizes}
          colors={colors}
          storages={storages}
        />
      </div>
    </div>
  );
};

export default ProductPage;
