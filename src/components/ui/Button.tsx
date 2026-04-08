import {
   TouchableOpacity,
   ActivityIndicator,
   Text,
   TouchableOpacityProps,
} from "react-native";
import { cn } from "@/lib/utils";

type Variant =
   | "primary"
   | "secondary"
   | "outline"
   | "ghost"
   | "danger"
   | "success";
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
   secondary: "bg-secondary active:bg-slate-700",
   outline: "border border-primary bg-transparent active:bg-primary/10",
   ghost: "bg-transparent active:bg-slate-800",
   danger: "bg-danger active:bg-red-600",
   success: "bg-success active:bg-emerald-600",
};

const loaderColors: Record<Variant, string> = {
   primary: "#0F172A",
   secondary: "#FFFFFF",
   outline: "#F59E0B",
   ghost: "#94A3B8",
   danger: "#FFFFFF",
   success: "#FFFFFF",
};

const textVariants: Record<Variant, string> = {
   primary: "text-background font-bold",
   secondary: "text-white font-medium",
   outline: "text-primary font-medium",
   ghost: "text-muted font-medium",
   danger: "text-white font-bold",
   success: "text-white font-bold",
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
         <ActivityIndicator
            color={loaderColors[variant]}
            size="small"
         />
      ) : (
         <Text className={cn("text-sm", textVariants[variant])}>
            {children}
         </Text>
      )}
   </TouchableOpacity>
);
