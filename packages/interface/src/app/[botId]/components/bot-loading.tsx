// bot-loading.tsx
import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingDots({
  className,
  color = "current",
  size = "md",
}: LoadingDotsProps) {
  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div
      className={cn("flex items-center space-x-1", className)}
      role="status"
      aria-label="Loading"
    >
      <div
        className={cn(
          dotSizes[size],
          "rounded-full animate-loading-dot-1 bg-black",
          color,
        )}
      />
      <div
        className={cn(
          dotSizes[size],
          "rounded-full animate-loading-dot-2 bg-black",
          color,
        )}
      />
      <div
        className={cn(
          dotSizes[size],
          "rounded-full animate-loading-dot-3 bg-black",
          color,
        )}
      />
    </div>
  );
}
