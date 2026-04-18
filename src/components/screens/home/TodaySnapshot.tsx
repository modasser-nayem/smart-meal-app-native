import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";

interface MealShotProps {
   label: string;
   icon: string;
   myMeals: number;
   groupJoined: number;
   total: number;
   active?: boolean;
   upcoming?: boolean;
}

const MealShot = ({
   label,
   icon,
   myMeals,
   groupJoined,
   total,
   active,
   upcoming,
}: MealShotProps) => {
   const bgClass = active
      ? "bg-primary"
      : upcoming
        ? "bg-surface-container border border-primary/20"
        : "bg-surface-container";

   const opacity = !active && !upcoming ? "opacity-50" : "";

   return (
      <View
         className={`flex-shrink-0 flex-row items-center gap-3 px-5 py-3.5 rounded-2xl mr-3 ${bgClass} ${opacity}`}
      >
         <Typography className="text-xl">{icon}</Typography>
         <View>
            <Typography
               className={`font-bold text-sm ${active ? "text-background" : upcoming ? "text-primary" : "text-on-surface"}`}
            >
               {label}
            </Typography>
            <View className="flex-row items-center gap-2 mt-0.5">
               {myMeals > 0 && (
                  <View
                     className={`flex-row items-center gap-0.5 px-1.5 py-0.5 rounded-md ${active ? "bg-background/15" : "bg-primary/15"}`}
                  >
                     <MaterialCommunityIcons
                        name="account-check"
                        size={10}
                        color={active ? "#0F172A" : "#F59E0B"}
                     />
                     <Typography
                        className={`text-[9px] font-bold ${active ? "text-background" : "text-primary"}`}
                     >
                        You: {myMeals}
                     </Typography>
                  </View>
               )}
               <Typography
                  className={`text-[10px] font-medium ${active ? "text-background/70" : "text-secondary-300"}`}
               >
                  {groupJoined}/{total} joined
               </Typography>
            </View>
         </View>
      </View>
   );
};

interface TodaySnapshotProps {
   data?: MealShotProps[];
   onViewDetails?: () => void;
}

export const TodaySnapshot = ({ data, onViewDetails }: TodaySnapshotProps) => {
   const meals: MealShotProps[] = data || [
      { label: "Breakfast", icon: "🌅", myMeals: 1, groupJoined: 8, total: 12, active: true },
      { label: "Lunch", icon: "🍱", myMeals: 1, groupJoined: 10, total: 12, upcoming: true },
      { label: "Dinner", icon: "🍽️", myMeals: 0, groupJoined: 0, total: 12 },
   ];

   const totalMyMeals = meals.reduce((sum, m) => sum + m.myMeals, 0);
   const totalGroupJoined = meals.reduce((sum, m) => sum + m.groupJoined, 0);
   const todayLabel = format(new Date(), "MMMM d");

   return (
      <View>
         {/* Section header */}
         <View className="flex-row items-center justify-between mb-4">
            <View>
               <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-0.5">
                  Daily Pulse
               </Typography>
               <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                  Today · {todayLabel}
               </Typography>
            </View>
            <TouchableOpacity
               onPress={onViewDetails}
               activeOpacity={0.75}
               className="w-9 h-9 bg-surface-container rounded-full items-center justify-center border border-outline/10 active:scale-95"
            >
               <MaterialCommunityIcons name="chevron-right" size={20} color="#F8FAFC" />
            </TouchableOpacity>
         </View>

         {/* Summary strip */}
         <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-surface-container rounded-2xl p-4 border border-outline/10">
               <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-7 h-7 rounded-lg bg-surface items-center justify-center">
                     <MaterialCommunityIcons name="account-group" size={14} color="#94A3B8" />
                  </View>
                  <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest">
                     Group
                  </Typography>
               </View>
               <Typography className="text-on-surface text-2xl font-extrabold">
                  {totalGroupJoined}
               </Typography>
               <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  meals logged
               </Typography>
            </View>

            <View className="flex-1 bg-primary/10 rounded-2xl p-4 border border-primary/20">
               <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-7 h-7 rounded-lg bg-primary/20 items-center justify-center">
                     <MaterialCommunityIcons name="account-check" size={14} color="#F59E0B" />
                  </View>
                  <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest">
                     Mine
                  </Typography>
               </View>
               <Typography className="text-primary text-2xl font-extrabold">
                  {totalMyMeals}
               </Typography>
               <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  meals today
               </Typography>
            </View>
         </View>

         {/* Meal breakdown strip */}
         <Typography className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest mb-3 ml-1">
            Breakdown
         </Typography>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {meals.map((meal, index) => (
               <MealShot key={index} {...meal} />
            ))}
         </ScrollView>
      </View>
   );
};
