import prismadb from "@/common/libs/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params;
    const { userId } = await auth();
    const body = await req.json();

    const {
      name,
      price,
      images,
      categoryId,
      sizeId,
      colors,
      storages,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is Required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is Required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is Required", { status: 400 });
    }

    if (!colors || !colors.length) {
      return new NextResponse("Color id is Required", { status: 400 });
    }

    if (!storages || !storages.length) {
      return new NextResponse("Storages are required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        isFeatured,
        isArchived,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        storages: {
          connect: storages.map((storageId: string) => ({
            id: storageId,
          })),
        },
        colors: {
          connect: colors.map((colorId: string) => ({ id: colorId })),
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const storageId = searchParams.get("storageId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const { storeId } = await params;

    if (!storeId) {
      return new NextResponse("Store id is Required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        ...(colorId && {
          colors: {
            some: {
              id: colorId,
            },
          },
        }),
        ...(storageId && {
          storages: {
            some: {
              id: storageId,
            },
          },
        }),
      },
      include: {
        images: true,
        category: true,
        size: true,
        colors: true,
        storages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
