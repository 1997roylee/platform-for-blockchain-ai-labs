import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

export type BotAvatarProps = {
  src?: string;
  alt?: string;
};
export default function BotAvatar({ src, alt }: BotAvatarProps) {
  return (
    <AspectRatio ratio={1}>
      {src ? (
        <Image fill src={src} alt={alt ?? ""} className="rounded-3xl" />
      ) : (
        <div className="bg-gray-200 w-full h-full" />
      )}
    </AspectRatio>
  );
}
