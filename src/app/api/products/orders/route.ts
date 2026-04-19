import { NextResponse } from "next/server";

let orders: any[] = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newOrder = {
    id: Date.now(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  return NextResponse.json(newOrder);
}
