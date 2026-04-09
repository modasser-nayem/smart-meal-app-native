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
   padding = true,
   className,
   children,
   ...props
}: ContainerProps) => {
   const Wrapper = withSafeArea ? SafeAreaView : View;
   const ContentWrapper = scrollable ? ScrollView : View;

   return (
      <Wrapper className="flex-1 bg-background">
         <StatusBar style={statusBarVariant} />
         <ContentWrapper
            className={cn("flex-1", padding && "px-md pb-2", className)}
            {...props}
         >
            {children}
         </ContentWrapper>
      </Wrapper>
   );
};
