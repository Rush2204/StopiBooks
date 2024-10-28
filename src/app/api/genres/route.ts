import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const genres = await prisma.genre.findMany();
    return NextResponse.json(genres, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { name }: { name: string } = await req.json();
    console.log(name);
    const newGenre = await prisma.genre.create({
      data: { name },
    });
    return NextResponse.json(newGenre, { status: 201 });
  } catch (error) {
    console.error("Failed to create genre:", error);
    return NextResponse.json(
      { error: "Failed to create genre" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { id, name } = await req.json();
    const updatedGenre = await prisma.genre.update({
      where: { id: id }, // Find the book by its id
      data: {
        name: name,
      },
    });

    return NextResponse.json(updatedGenre, { status: 200 });
  } catch (error) {
    console.error("Failed to update the genre:", error);
    return NextResponse.json(
      { error: "Failed to update the genre" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { id } = await req.json();
    const deletedGenre = await prisma.genre.delete({
      where: { id: id },
    });
    return NextResponse.json(deletedGenre, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the genre:", error);
    return NextResponse.json(
      { error: "Failed to delete the genre" },
      { status: 500 }
    );
  }
}
