import { TouchableOpacity, ActivityIndicator, Text, TouchableOpacityProps } from "react-native";
import { cn } from "@/lib/utils";
import { Colors } from "@/constants/colors";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
   children: React.ReactNode;
   variant?: Variant;
   size?: Size;
   loading?: boolean;
   fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
   primary: "bg-primary active:bg-primary-dark",
   secondary: "bg-surface-container active:bg-surface-elevated",
   outline: "border border-primary bg-transparent active:bg-primary/10",
   ghost: "bg-transparent active:bg-surface",
   danger: "bg-error active:bg-error/80",
   success: "bg-success active:bg-success/80",
};

const loaderColors: Record<Variant, string> = {
   primary: Colors.onPrimary,
   secondary: Colors.onSurface,
   outline: Colors.primary,
   ghost: Colors.textSubtle,
   danger: Colors.onSurface,
   success: Colors.onPrimary,
};

const textVariants: Record<Variant, string> = {
   primary: "text-on-primary font-bold",
   secondary: "text-on-surface font-medium",
   outline: "text-primary font-medium",
   ghost: "text-secondary-300 font-medium",
   danger: "text-on-surface font-bold",
   success: "text-on-primary font-bold",
};

const sizes: Record<Size, string> = {
   sm: "h-10 px-4 rounded-md",
   md: "h-12 px-6 rounded-lg",
   lg: "h-14 px-8 rounded-xl",
};

export const Button = ({
   children,
   variant = "primary",
   size = "md",
   loading,
   disabled,
   fullWidth,
   onPress,
   className,
   ...props
}: ButtonProps) => (
   <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
         "items-center justify-center flex-row",
         sizes[size],
         variants[variant],
         fullWidth && "w-full",
         (disabled || loading) && "opacity-50",
         className,
      )}
      {...props}
   >
      {loading ? (
         <ActivityIndicator color={loaderColors[variant]} size="small" />
      ) : (
         <Text className={cn("text-sm", textVariants[variant])}>{children}</Text>
      )}
   </TouchableOpacity>
);
