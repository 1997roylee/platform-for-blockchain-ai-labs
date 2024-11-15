import { AspectRatio } from "@/components/ui/aspect-ratio";

function BotItem() {
  return (
    <div className="rounded-xl border flex p-3 hover:bg-gray-50 cursor-pointer">
      <div className="w-24">
        <AspectRatio ratio={1}></AspectRatio>
      </div>
      <div>
        <p>Name</p>
        <p>Description</p>
      </div>
    </div>
  );
}

export default function BotsList() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <BotItem />
      <BotItem />
      <BotItem />
    </div>
  );
}
