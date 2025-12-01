import prismadb from "@/common/libs/prisma";
import { PaymentProps } from "@/common/types/payment";
import crypto from "crypto";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  const data: PaymentProps = await req.json();

  const orderId = data.order_id;

  let responseData = null;

  const transactionStatus = data.transaction_status;
  const fraudStatus = data.fraud_status;
  const statusCode = data.status_code;
  const grossAmount = data.gross_amount;
  const signatureKey = data.signature_key;

  const hash = crypto
    .createHash("sha512")
    .update(
      `${orderId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (signatureKey !== hash) {
    return NextResponse.json(
      { error: "Missing Signature Key" },
      { status: 404 }
    );
  }

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      const transaction = await prismadb.order.update({
        data: {
          isPaid: true,
        },
        where: {
          id: orderId,
        },
      });
      responseData = transaction;
    }
  } else if (transactionStatus == "settlement") {
    const transaction = await prismadb.order.update({
      data: {
        isPaid: true,
      },
      where: {
        id: orderId,
      },
    });
    responseData = transaction;
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    const transaction = await prismadb.order.update({
      data: {
        isPaid: false,
      },
      where: {
        id: orderId,
      },
    });
    responseData = transaction;
  }

  return NextResponse.json(
    { responseData },
    { headers: corsHeaders, status: 200 }
  );
}
