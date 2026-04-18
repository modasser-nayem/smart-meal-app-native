import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";

interface MealsHeaderProps {
   title: string;
   subtitle: string;
}

export const MealsHeader = ({ title, subtitle }: MealsHeaderProps) => {
   return (
      <View className="items-center pt-4 pb-3">
         <Typography className="text-secondary-400 text-[10px] uppercase font-black tracking-[0.25em] mb-1">
            {subtitle}
         </Typography>
         <Typography className="text-on-surface text-2xl font-black tracking-tight">
            {title}
         </Typography>
         <View className="w-10 h-[3px] bg-primary/30 rounded-full mt-3" />
      </View>
   );
};
