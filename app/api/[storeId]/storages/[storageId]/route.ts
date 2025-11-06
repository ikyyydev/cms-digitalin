import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/common/libs/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { storageId: string } }
) {
  try {
    const { storageId } = await params;
    if (!storageId) {
      return new NextResponse("Storage id is required", { status: 400 });
    }

    const storage = await prismadb.storage.findUnique({
      where: {
        id: storageId,
      },
    });

    return NextResponse.json(storage);
  } catch (error) {
    console.log("[STORAGE_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; storageId: string } }
) {
  try {
    const { userId } = await auth();
    const { storageId, storeId } = await params;
    const body = await req.json();
    const { value } = body;

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!storageId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const storage = await prismadb.storage.updateMany({
      where: {
        id: storageId,
      },
      data: {
        value,
      },
    });

    return NextResponse.json(storage);
  } catch (error) {
    console.log("[STORAGE_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; storageId: string } }
) {
  try {
    const { storeId, storageId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    if (!storageId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const storage = await prismadb.storage.deleteMany({
      where: {
        id: storageId,
      },
    });

    return NextResponse.json(storage);
  } catch (error) {
    console.log("[STORAGE_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
