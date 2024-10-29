import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse> {
  const { id } = params;
  try {
    const prisma = new PrismaClient();
    const books = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true, // Include the related author
        genre: true, // Include the related genre (if needed)
      },
    });
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
