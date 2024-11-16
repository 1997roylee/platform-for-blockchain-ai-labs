"use server";

import { auth } from "@/lib/auth";
import { getWallet } from "@/lib/server/wallet";
import { Coinbase } from "@coinbase/coinbase-sdk";

export async function subscribeBot(botId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const wallet = await getWallet(session.user.id!);

  const balance = await wallet.getBalance(Coinbase.assets.Eth);

  if (Number(balance) < 0.001) {
    throw new Error("Insufficient funds");
  }

  // console.log("botId", botId, ethers.parseEther("0.001").toString());
  const abi = [
    {
      inputs: [],
      name: "subscribe",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];
  // console.log("Approve transaction completed:", approveTx.getTransactionHash());
  try {
    const contractInvocation = await wallet.invokeContract({
      contractAddress: botId,
      method: "subscribe",
      args: {},
      amount: 0.001,
      assetId: Coinbase.assets.Eth,
      abi,
    });
    await contractInvocation.wait();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to subscribe");
  }

  return { success: true };
}

// export async function saveThreadMessages(
//   threadId: string,
//   agentId: string,
//   messages: Message[],
// ) {
//   const session = await auth();

//   if (!session?.user) {
//     throw new Error("Unauthorized");
//   }

//   await prisma.thread.upsert({
//     where: {
//       id: threadId,
//     },
//     update: {
//       messages: {
//         createMany: {
//           data: messages.map((message) => ({
//             content: message.text,
//             role: message.role.toUpperCase(),
//             // threadId,
//             // userId: session.user!.id!,
//           })),
//         },
//       },
//     },
//     create: {
//       agentId,
//       userId: session.user.id!,
//       messages: {
//         createMany: {
//           data: messages.map((message) => ({
//             content: message.text,
//             role: message.role.toUpperCase(),
//             // threadId,
//             // userId: session.user!.id!,
//           })),
//         },
//       },
//     },
//   });
//   return { success: true };
// }

export async function spendCredit(botId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

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
  try {
    const contractInvocation = await wallet.invokeContract({
      contractAddress: botId,
      method: "spendCredits",
      args: {
        amount: "1",
      },
      abi,
    });
    await contractInvocation.wait();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to spend credits");
  }

  return { success: true };
}
