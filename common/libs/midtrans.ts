import { Snap } from "midtrans-client";

export const midtrans = new Snap({
  isProduction: false,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
});
