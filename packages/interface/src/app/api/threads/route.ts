import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // throw new Error("Unauthorized");
  }

  const threads = await prisma.thread.findMany({
    where: {
      userId: session.user.id,
    },
    take: 20,
  });
  return NextResponse.json(threads);
}
