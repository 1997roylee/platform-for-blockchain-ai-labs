import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import "@coinbase/onchainkit/styles.css";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "@/lib/wagmi";
import { headers } from "next/headers";
import Headers from "@/components/headers";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountProvider from "@/components/account-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie"),
  );

  return (
    <html lang="en">
      <body
        className={cn(inter.className, "overflow-hidden")}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialState={initialState}>
          <SidebarProvider>
            {/* <AppSidebar/> */}
            <AccountProvider>
              <main className="h-dvh flex w-full flex-col">
                <Headers />
                {children}
              </main>
            </AccountProvider>
          </SidebarProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
