import { TouchableOpacity, View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const MealBottomAction = () => {
   return (
      <View className="flex-1">
         {/* Meal Schedule Shortcut */}
         <TouchableOpacity
            className="flex-row items-center justify-between bg-surface-container/90 px-6 py-4 rounded-[24px] border border-outline/5 active:bg-surface-container/50"
            onPress={() => {}}
         >
            <View className="flex-row items-center gap-4">
               <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                  <MaterialCommunityIcons
                     name="calendar-clock"
                     size={20}
                     color="#F59E0B"
                  />
               </View>
               <View>
                  <Typography className="text-sm font-bold text-on-surface">
                     Set Meal Schedule
                  </Typography>
                  <Typography className="text-[10px] text-on-surface opacity-60">
                     Personalize your weekly routines
                  </Typography>
               </View>
            </View>
            <MaterialCommunityIcons
               name="chevron-right"
               size={20}
               className="text-on-surface"
            />
         </TouchableOpacity>
      </View>
   );
};
