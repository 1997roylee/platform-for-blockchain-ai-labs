
import "@/lib/server/coinbase"
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    const session = await auth()

    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const wallets = await prisma.wallet.findFirst({
        where: {
            userId: session.user.id
        }
    })

    return NextResponse.json(wallets)
}