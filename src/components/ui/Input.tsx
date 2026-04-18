import { View, TextInput, TextInputProps, Text } from "react-native";
import { cn } from "@/lib/utils";
import React from "react";
import { Colors } from "@/constants/colors";

interface InputProps extends TextInputProps {
   label?: string;
   error?: string;
   containerClassName?: string;
   inputClassName?: string;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
}

export const Input = ({
   label,
   error,
   containerClassName,
   inputClassName,
   leftIcon,
   rightIcon,
   ...props
}: InputProps) => {
   return (
      <View className={cn("w-full mb-5", containerClassName)}>
         {label && (
            <Text className="text-primary text-[11px] uppercase tracking-widest font-bold mb-2 ml-1">
               {label}
            </Text>
         )}
         <View className="relative flex-row items-center">
            {leftIcon && <View className="absolute left-4 z-10">{leftIcon}</View>}
            <TextInput
               placeholderTextColor={Colors.placeholder}
               className={cn(
                  "h-14 w-full bg-surface border rounded-xl text-on-surface text-base",
                  "border border-outline",
                  leftIcon ? "pl-12" : "pl-4",
                  rightIcon ? "pr-12" : "pr-4",
                  error && "border-error",
                  inputClassName,
               )}
               {...props}
            />
            {rightIcon && <View className="absolute right-4 z-10">{rightIcon}</View>}
         </View>
         {error && <Text className="text-error text-xs font-medium mt-1.5 ml-1">{error}</Text>}
      </View>
   );
};
