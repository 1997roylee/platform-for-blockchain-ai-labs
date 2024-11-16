import { Wallet, WalletAddress } from "@coinbase/coinbase-sdk";
import { NextResponse } from "next/server";
import "@/lib/server/coinbase"
import { auth } from "@/lib/auth";

export async function GET(
    _: Request,
    { params }: { params: { walletId: string; addressId: string } }
 ) {
    const session = await auth()
 
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      const { walletId, addressId } = params;
      console.log('walletId', walletId);
      const wallet = await Wallet.fetch(walletId);
      const address = await wallet.getAddress(addressId) as WalletAddress;
      
      // Fetch balances
      const balances = await address.listBalances();
      const formattedBalances: Record<string, number> = {};
      balances.forEach((balance, currency) => {
        formattedBalances[currency] = parseFloat(balance.toString());
      });
  

      return NextResponse.json({
        id: address.getId() as string,
        network: address.getNetworkId(),
        address: address.getId(),
        walletId: wallet.getId() as string,
        balances: formattedBalances,
      });
    } catch (error) {
      console.error('Error fetching address:', error);
      return NextResponse.json({ error: 'Failed to fetch address' }, { status: 500 });
    }
}