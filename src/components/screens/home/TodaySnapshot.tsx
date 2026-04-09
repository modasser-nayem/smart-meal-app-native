import { View, ScrollView } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface MealShotProps {
   label: string;
   icon: string;
   joined: number;
   total: number;
   active?: boolean;
   upcoming?: boolean;
}

const MealShot = ({
   label,
   icon,
   joined,
   total,
   active,
   upcoming,
}: MealShotProps) => {
   return (
      <View
         className={cn(
            "flex-shrink-0 flex-row items-center gap-3 px-5 py-3 rounded-2xl mr-4",
            active
               ? "bg-primary shadow-lg shadow-orange-500/20"
               : upcoming
                 ? "bg-surface-container border border-primary/20"
                 : "bg-surface-container opacity-60",
         )}
      >
         <Typography className="text-xl">{icon}</Typography>
         <View className="flex flex-col">
            <Typography
               className={cn(
                  "font-bold text-sm",
                  active
                     ? "text-outline"
                     : upcoming
                       ? "text-primary"
                       : "text-on-surface",
               )}
            >
               {label}
            </Typography>
            <Typography
               className={cn(
                  "text-[10px] font-medium",
                  active ? "text-outline" : "text-on-surface",
               )}
            >
               {joined}/{total} joined
            </Typography>
         </View>
      </View>
   );
};

export const TodaySnapshot = () => {
   return (
      <View className="my-6">
         <View className="flex-row items-center justify-between mb-4">
            <Typography
               variant="h3"
               className="font-semibold text-on-surface text-lg"
            >
               Today · April 5
            </Typography>
            <MaterialCommunityIcons
               name="chevron-right"
               size={24}
               color="#dae2fd"
            />
         </View>
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
         >
            <MealShot
               label="Breakfast"
               icon="🌅"
               joined={8}
               total={12}
               active
            />
            <MealShot
               label="Lunch"
               icon="🍱"
               joined={10}
               total={12}
               upcoming
            />
            <MealShot
               label="Dinner"
               icon="🍽️"
               joined={0}
               total={12}
            />
         </ScrollView>
      </View>
   );
};
