import { ReactNode } from "react";
import { cn } from "@booking/lib/util";

export default function Title({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-xl font-bold tracking-tight lg:text-xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
