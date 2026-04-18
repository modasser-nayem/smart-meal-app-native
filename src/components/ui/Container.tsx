import { View, ViewProps, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { StatusBar } from "expo-status-bar";

interface ContainerProps extends ViewProps {
   scrollable?: boolean;
   withSafeArea?: boolean;
   statusBarVariant?: "light" | "dark" | "auto";
   padding?: boolean;
}

export const Container = ({
   scrollable = false,
   withSafeArea = true,
   statusBarVariant = "light",
   padding = false, // default OFF — screens manage their own padding
   className,
   children,
   ...props
}: ContainerProps) => {
   const Wrapper = withSafeArea ? SafeAreaView : View;

   return (
      <Wrapper className="flex-1 bg-background">
         <StatusBar style={statusBarVariant} />
         {scrollable ? (
            <ScrollView
               className={cn("flex-1", padding && "px-6", className)}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
               {...(props as any)}
            >
               {children}
            </ScrollView>
         ) : (
            <View className={cn("flex-1", padding && "px-6", className)} {...props}>
               {children}
            </View>
         )}
      </Wrapper>
   );
};
