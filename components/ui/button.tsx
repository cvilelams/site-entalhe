import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-titulo text-label font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-musgo focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-verde-musgo text-white hover:-translate-y-px hover:bg-[#4e8160] hover:shadow-btn",
        secondary: "bg-verde-folha text-white hover:-translate-y-px hover:bg-[#8da040] hover:shadow-btn-2",
        outline: "border-2 border-terracota bg-transparent text-terracota hover:bg-terracota hover:text-white",
        ghost: "border border-gray-300 bg-transparent text-cinza hover:border-cinza",
      },
      size: {
        default: "h-11 px-8 py-4",
        sm: "h-9 px-4 py-2",
        lg: "h-12 px-10 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
