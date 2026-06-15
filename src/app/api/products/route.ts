import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { products as defaultProducts } from "@/data/products";

export async function GET() {
  const count = await prisma.product.count();

  if (count === 0) {
    await prisma.product.createMany({
      data: defaultProducts.map((product) => ({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
      })),
    });
  }

  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: Number(body.price),
      image: body.image,
      description: body.description,
      category: body.category,
    },
  });

  return NextResponse.json(product);
}
