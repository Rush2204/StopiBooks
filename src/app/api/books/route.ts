import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const books = await prisma.book.findMany({
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
    const prisma = new PrismaClient();
    const { id, title, summary, authorId, genreId } = await req.json(); // Get the data from the request

    // Update the book by its id
    const updatedBook = await prisma.book.update({
      where: { id: id }, // Find the book by its id
      data: {
        title: title, // Update the title
        summary: summary,
        authorId: authorId, // Update the authorId
        genreId: genreId, // Update the genreId
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
