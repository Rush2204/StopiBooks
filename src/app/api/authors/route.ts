import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const authors = await prisma.author.findMany();
    return NextResponse.json(authors, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { name, bio }: { name: string; bio: string } = await req.json();
    console.log(name, bio);
    const newAuthor = await prisma.author.create({
      data: { name, bio },
    });
    return NextResponse.json(newAuthor, { status: 201 });
  } catch (error) {
    console.error("Failed to create author:", error);
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { id, name, bio } = await req.json();
    const updatedAuthor = await prisma.author.update({
      where: { id: id }, // Find the book by its id
      data: {
        name: name,
        bio: bio,
      },
    });

    return NextResponse.json(updatedAuthor, { status: 200 });
  } catch (error) {
    console.error("Failed to update the author:", error);
    return NextResponse.json(
      { error: "Failed to update the autor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();
    const { id } = await req.json();
    const deletedAuthor = await prisma.author.delete({
      where: { id: id },
    });
    return NextResponse.json(deletedAuthor, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the author:", error);
    return NextResponse.json(
      { error: "Failed to delete the author" },
      { status: 500 }
    );
  }
}
