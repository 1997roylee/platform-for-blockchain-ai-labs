"use client";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { PropsWithChildren } from "react";
import { signOut } from "@/lib/auth";
import { useBalance } from "wagmi";
import { getAddress } from "viem";
import { formatWalletAddress } from "@/lib/format";
import Avatar from "boring-avatars";
import { useCopyToClipboard } from "usehooks-ts";
import toast from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";

export default function AccountSheet({
  children,
  address,
}: PropsWithChildren & { address: string }) {
  const [copiedText, copy] = useCopyToClipboard();

  const handleLogout = () => {
    signOut();
  };

  const { isPending, data: balance } = useBalance({
    address: getAddress(address),
    query: {
      enabled: !!address,
      refetchInterval: 15 * 1000,
    },
  });

  const handleCopy = () => {
    copy(address).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-3 h-full">
          <Avatar name={address} variant="beam" size={64} />
          <div className="flex gap-3 items-center">
            <p>{formatWalletAddress(address)}</p>
            <Button variant="secondary" size="icon" onClick={handleCopy}>
              <IoCopyOutline />
            </Button>
          </div>
          <div className="">
            Balance: {isPending ? 0 : Number(balance?.formatted).toFixed(6)} ETH
          </div>

          <div className="flex-1"></div>
          <Button variant="secondary" onClick={handleLogout} size="lg">
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
