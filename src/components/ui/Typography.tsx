import { Text, TextProps } from "react-native";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "body" | "body-sm" | "caption" | "error";

interface TypographyProps extends TextProps {
   variant?: Variant;
   children: React.ReactNode;
}

const variants: Record<Variant, string> = {
   h1: "text-3xl font-bold text-white",
   h2: "text-2xl font-semibold text-white",
   h3: "text-xl font-medium text-white",
   body: "text-base text-gray-200",
   "body-sm": "text-sm text-gray-300",
   caption: "text-xs text-muted",
   error: "text-xs text-danger font-medium",
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
