import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-20 w-full rounded-sm border border-[#d5cec6] bg-white px-4 py-3 font-corpo text-body text-cinza ring-offset-white placeholder:text-cinza/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-musgo focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
