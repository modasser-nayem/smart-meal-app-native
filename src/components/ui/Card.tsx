import { View, ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps extends ViewProps {
   elevated?: boolean;
   padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({
   elevated = false,
   padding = "md",
   className,
   children,
   ...props
}: CardProps) => {
   const paddingStyles = {
      none: "",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
   };

   return (
      <View
         className={cn(
            "rounded-xl bg-surface",
            elevated && "bg-surface-container shadow-sm",
            paddingStyles[padding],
            className,
         )}
         {...props}
      >
         {children}
      </View>
   );
};
