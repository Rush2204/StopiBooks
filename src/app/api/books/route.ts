import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || undefined; // Título a buscar
    const startDate = searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : undefined; // Fecha de inicio
    const endDate = searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : undefined; // Fecha de fin

    const where = {
      ...(title && {
        title: { contains: title, mode: "insensitive" as const },
      }),
      ...(startDate &&
        endDate && {
          publishedAt: {
            gte: startDate,
            lte: endDate,
          },
        }),
      ...(startDate &&
        !endDate && {
          publishedAt: {
            gte: startDate,
          },
        }),
      ...(!startDate &&
        endDate && {
          publishedAt: {
            lte: endDate,
          },
        }),
    };

    const books = await prisma.book.findMany({
      where: {
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive" as const, // Aseguramos que mode sea compatible con QueryMode
          },
        }),
        ...(startDate && {
          publishedAt: {
            gte: startDate,
          },
        }),
        ...(endDate && {
          publishedAt: {
            lte: endDate,
          },
        }),
      },
      include: {
        author: true,
        genre: true,
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Creating book!!!");
    const prisma = new PrismaClient();
    const {
      title,
      summary,
      publishedAt,
      authorId,
      genreId,
    }: {
      title: string;
      summary: string;
      publishedAt: Date;
      authorId: string;
      genreId: string;
    } = await req.json();
    const publishedAtFormatted = new Date(publishedAt);
    const newBook = await prisma.book.create({
      data: {
        title,
        summary,
        publishedAt: publishedAtFormatted,
        authorId,
        genreId,
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Failed to create book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Trigerred");
    const prisma = new PrismaClient();
    const { id, title, summary, publishedAt, authorId, genreId } =
      await req.json(); // Get the data from the request
    console.log("request", req.json());

    // Update the book by its id
    const updatedBook = await prisma.book.update({
      where: { id: id }, // Find the book by its id
      data: {
        title, // Update the title
        summary,
        publishedAt,
        authorId, // Update the authorId
        genreId, // Update the genreId
      },
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Failed to update the book:", error);
    return NextResponse.json(
      { error: "Failed to update the book" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { id } = await req.json();
    const deletedBook = await prisma.book.delete({
      where: { id: id },
    });
    return NextResponse.json(deletedBook, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the book:", error);
    return NextResponse.json(
      { error: "Failed to delete the book" },
      { status: 500 }
    );
  }
}
