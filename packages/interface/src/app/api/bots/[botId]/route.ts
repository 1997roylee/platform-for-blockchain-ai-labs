import { auth } from "@/lib/auth";
import { getWallet } from "@/lib/server/wallet";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  {
    params: { botId },
  }: {
    params: {
      botId: string;
    };
  },
) {
  const session = await auth();

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallet = await getWallet(session.user.id!);

  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "spendCredits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contractInvocation = await wallet.invokeContract({
    contractAddress: botId,
    method: "spendCredits",
    args: {
      amount: 1,
    },
    abi,
  });
  await contractInvocation.wait();

  return NextResponse.json({ success: true });
}
