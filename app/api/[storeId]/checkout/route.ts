import { NextResponse } from "next/server";

import prismadb from "@/common/libs/prisma";
import { MidtransProps } from "@/common/types";
import { midtrans } from "@/common/libs/midtrans";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params;
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: MidtransProps[] = [];

    products.forEach((product) => {
      line_items.push({
        name: product.name,
        quantity: 1,
        price: product.price.toNumber(),
      });
    });

    const order = await prismadb.order.create({
      data: {
        storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const totalAmount = line_items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: totalAmount,
      },
      item_details: line_items,
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_URL}/success?success=true`,
        unfinish_url: `${process.env.NEXT_PUBLIC_URL}/success?canceled=true`,
        error_url: `${process.env.NEXT_PUBLIC_URL}/success?canceled=true`,
      },
    };

    const token = await midtrans.createTransaction(parameter);

    return NextResponse.json(
      { url: token.redirect_url },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[CHECKOUT_POST_ERROR]", error);
    return new NextResponse("Internal server error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
