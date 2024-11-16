import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Provider } from "next-auth/providers";
// import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { createWallet } from "./server/coinbase";
import { encryptSeed } from "./crypto";
const providers: Provider[] = [Google];

export const createUser = async ({ ...data }: AdapterUser) => {
  console.log(data);
  const wallet = await createWallet();

  if (!wallet) {
    throw new Error("Failed to create wallet");
  }

  // const defaultAddress = await wallet.getDefaultAddress();
  const walletId = wallet.getId();

  if (!walletId) throw new Error("Failed to get wallet id");
  const walletData = await wallet.export();

  const user = await prisma.user.create({
    data: {
      ...data,
      wallets: {
        create: {
          walletId: walletId,
          encryptedSeed: encryptSeed(walletData.seed),
        },
      },
    },
  });

  return user;
};

const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...adapter,
    createUser,
  } as Adapter,
  providers: providers,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          // firstName: token.firstName ?? session.user.firstName,
          // lastName: token.lastName ?? session.user.lastName,
          // role: token.role ?? session.user.role,
          // email: token.email ?? session.user.email,
          // solanaAddress:
          //   (token.solanaAddress as string) ?? session.user.solanaAddress,
          id: token.id as string,
        };
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          // default: user.solanaAddress,
          // firstName: user.firstName,
          // lastName: user.lastName,
          // role: user.role,
        }; // Save id to token as docs says: https://next-auth.js.org/configuration/callbacks
      }

      return token;
    },
  },
});
