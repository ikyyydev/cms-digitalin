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

    const { value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!value) {
      return new NextResponse("Value is Required", { status: 400 });
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

    const storage = await prismadb.storage.create({
      data: {
        value,
        storeId: storeId,
      },
    });

    return NextResponse.json(storage);
  } catch (error) {
    console.log("[STORAGE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store id is Required", { status: 400 });
    }

    const storage = await prismadb.storage.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(storage);
  } catch (error) {
    console.log("[STORAGES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
