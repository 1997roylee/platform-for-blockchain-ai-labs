import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBotItem() {
  return (
    <div className="flex gap-3 rounded-xl border p-3">
      <Skeleton className="h-16 w-16" />
      <div className="flex gap-1 flex-col">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
export default function SkeletonBotList() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <SkeletonBotItem />
      <SkeletonBotItem />
      <SkeletonBotItem />
    </div>
  );
}
