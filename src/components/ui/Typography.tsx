import { Text, TextProps } from "react-native";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "body" | "body-sm" | "caption" | "error";

interface TypographyProps extends TextProps {
   variant?: Variant;
   children: React.ReactNode;
}

const variants: Record<Variant, string> = {
   h1: "text-3xl font-bold text-on-surface",
   h2: "text-2xl font-semibold text-on-surface",
   h3: "text-xl font-medium text-on-surface",
   body: "text-base text-on-surface",
   "body-sm": "text-sm text-secondary-300",
   caption: "text-xs text-secondary-400",
   error: "text-xs text-error font-medium",
};

export const Typography = ({
   variant = "body",
   className,
   children,
   ...props
}: TypographyProps) => {
   return (
      <Text className={cn(variants[variant], className)} {...props}>
         {children}
      </Text>
   );
};
