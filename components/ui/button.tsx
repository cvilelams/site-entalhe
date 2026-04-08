import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-corpo font-medium uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:  "bg-terracota text-cream hover:-translate-y-px hover:bg-terracota-dark",
        secondary:"bg-terra-lt text-cream hover:-translate-y-px hover:bg-terracota",
        outline:  "border border-rule bg-transparent text-espresso hover:bg-cream-3 hover:border-brown-lt",
        ghost:    "border border-rule bg-transparent text-espresso hover:bg-cream-3",
        dark:     "bg-espresso text-cream hover:-translate-y-px hover:bg-terracota",
      },
      size: {
        default: "h-11 px-9 py-4 text-[13px]",
        sm:      "h-9 px-6 py-2 text-[12px]",
        lg:      "h-12 px-10 py-4 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
