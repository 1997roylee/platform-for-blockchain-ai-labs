"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { PropsWithChildren } from "react";
import { useBalance } from "wagmi";
import { formatEther, getAddress } from "viem";
import { formatWalletAddress } from "@/lib/format";
import Avatar from "boring-avatars";
import { useCopyToClipboard } from "usehooks-ts";
import toast from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import usePurchaseHistory from "@/hooks/use-purchase-history";
import useSpendHistory from "@/hooks/use-spend-history";
import dayjs from "dayjs";
import useTotalCredits from "@/hooks/use-total-credits";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountSheet({
  children,
  address,
}: PropsWithChildren & { address: string }) {
  const [copiedText, copy] = useCopyToClipboard();
  const { data: purchaseHistory, isLoading: isPurchaseHistoryLoading } =
    usePurchaseHistory(address);

  const { data: spendHistory, isLoading: isSpendHistoryLoading } =
    useSpendHistory(address);
  const handleLogout = () => {
    signOut();
  };

  const { data: totalCredits } = useTotalCredits(address);
  console.log("data", purchaseHistory, totalCredits);

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
          <div className="">
            Total Credits: {totalCredits?.totalCredits ?? 0}
          </div>
          <div className="border-b my-1"></div>

          <div className="flex-1 overflow-y-scroll flex flex-col gap-3">
            {isPurchaseHistoryLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="font-medium">Purchase history</div>
                <div className="flex flex-col gap-2 text-sm">
                  {purchaseHistory?.map((purchase) => {
                    return (
                      <div key={purchase.id} className="flex gap-2">
                        <div>
                          {dayjs(purchase.blockTimestamp * 1000).format(
                            "YYYY-MM-DD",
                          )}
                        </div>
                        <div>
                          Buy {purchase.credits} credits costs{" "}
                          {formatEther(purchase.costs)} ETH
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {isSpendHistoryLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="font-medium">Spend history</div>
                <div className="flex flex-col text-sm gap-2">
                  {spendHistory?.map((spend, index) => {
                    return (
                      <div key={spend.id} className="flex gap-2">
                        <div>
                          {dayjs(spend.blockTimestamp * 1000).format(
                            "YYYY-MM-DD",
                          )}
                        </div>
                        <div>Spend {spend.credits} Credit</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Button variant="secondary" onClick={handleLogout} size="lg">
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
