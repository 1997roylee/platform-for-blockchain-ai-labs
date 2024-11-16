"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export type SearchBarProps = {
  onSubmit?: (query: string) => void;
  disabled?: boolean;
};
export default function SearchBar({ onSubmit, disabled }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    // if (disabled) return;
    // console.log("submitting", query);
    onSubmit?.(query);
    setQuery("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <Input
          size="lg"
          value={query}
          placeholder="start a new chat"
          onChange={handleChange}
        />
        <div className="flex absolute right-0 top-0 bottom-0 p-1">
          <div className="w-10">
            <AspectRatio ratio={1}>
              <Button
                className="h-full w-full rounded-full"
                size="icon"
                type="submit"
                //   onClick={handleSubmit}
              >
                <FaArrowRight />
              </Button>
            </AspectRatio>
          </div>
        </div>
      </form>
    </div>
  );
}
