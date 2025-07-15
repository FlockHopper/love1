import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridLayoutProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function GridLayout({ 
  children, 
  columns = 3, 
  gap = "md", 
  className 
}: GridLayoutProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-12"
  };

  const gapSizes = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6"
  };

  return (
    <div className={cn(
      "grid",
      gridCols[columns],
      gapSizes[gap],
      className
    )}>
      {children}
    </div>
  );
}