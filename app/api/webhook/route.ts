import { NextResponse } from "next/server";

import prismadb from "@/common/libs/prisma";
import { midtrans } from "@/common/libs/midtrans";

export async function POST(req: Request) {
  try {
    const response = await req.json();

    const notification = await midtrans.transaction.notification(response);

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    // console.log(
    //   `Order ${orderId} - Transaction status: ${transactionStatus}, Fraud status: ${fraudStatus}`
    // );

    let isPaid = false;

    if (transactionStatus === "capture") {
      if (fraudStatus === "accept") {
        isPaid = true;
      }
    } else if (transactionStatus === "settlement") {
      isPaid = true;
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "expire" ||
      transactionStatus === "deny"
    ) {
      isPaid = false;
    }

    if (orderId) {
      await prismadb.order.update({
        where: { id: orderId },
        data: { isPaid: isPaid },
      });

      // console.log(`Order ${orderId} updated successfully. isPaid: ${isPaid}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[WEBHOOK_ERROR]", error);
    return new NextResponse("Webhook processing error", { status: 500 });
  }
}
