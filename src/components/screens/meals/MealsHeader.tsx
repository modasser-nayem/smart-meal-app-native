import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";

interface MealsHeaderProps {
   title: string;
   subtitle: string;
}

export const MealsHeader = ({ title, subtitle }: MealsHeaderProps) => {
   return (
      <View className="mb-4">
         {/* Simple Centered Header */}
         <View className="items-center py-2">
            <Typography className="text-on-surface text-[10px] uppercase font-black tracking-[0.25em] mb-1 opacity-60">
               {subtitle}
            </Typography>
            <Typography className="text-on-surface text-2xl font-black tracking-tighter">
               {title}
            </Typography>
         </View>

         {/* Inspectpull Line - Subtle separator aligned with content */}
         <View className="w-full items-center mt-2">
            <View className="w-12 h-1 bg-primary/20 rounded-full" />
         </View>
      </View>
   );
};
