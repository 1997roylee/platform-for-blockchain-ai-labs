import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa";
export default function SearchBar() {
  return (
    <div className="relative">
      <Input size="lg" placeholder="start a new chat" />
      <div className="flex absolute right-0 top-0 bottom-0 p-1">
        <div className="w-10">
          <AspectRatio ratio={1}>
            <Button className="h-full w-full rounded-full" size="icon">
                <FaArrowRight/>
            </Button>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
