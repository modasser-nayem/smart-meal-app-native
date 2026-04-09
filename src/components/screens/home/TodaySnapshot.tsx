import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

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
            <View className="flex-row items-center gap-1.5">
               {myMeals > 0 && (
                  <View
                     className={cn(
                        "px-1 rounded bg-white/20 flex-row items-center",
                        active ? "bg-black/10" : "bg-primary/20",
                     )}
                  >
                     <MaterialCommunityIcons
                        name="account-check"
                        size={10}
                        color={active ? "#334155" : "#F59E0B"}
                     />
                     <Typography
                        className={cn(
                           "text-[9px] font-bold ml-0.5",
                           active ? "text-outline" : "text-primary",
                        )}
                     >
                        ME: {myMeals}
                     </Typography>
                  </View>
               )}
               <Typography
                  className={cn(
                     "text-[10px] font-medium",
                     active ? "text-outline" : "text-on-surface",
                  )}
               >
                  GRP: {groupJoined}/{total}
               </Typography>
            </View>
         </View>
      </View>
   );
};

const SummaryCard = ({ label, value, subLabel, icon, isPrimary }: any) => (
   <View
      className={cn(
         "flex-1 p-5 rounded-[32px]",
         isPrimary
            ? "bg-primary/10 border border-primary/20"
            : "bg-surface-container border border-outline/10",
      )}
   >
      <View className="flex-row items-center gap-2 mb-3">
         <View
            className={cn(
               "w-8 h-8 rounded-xl items-center justify-center",
               isPrimary ? "bg-primary/20" : "bg-surface/50",
            )}
         >
            <MaterialCommunityIcons
               name={icon as any}
               size={16}
               color={isPrimary ? "#F59E0B" : "#94A3B8"}
            />
         </View>
         <Typography className="text-[10px] font-bold uppercase tracking-widest text-on-surface/60">
            {label}
         </Typography>
      </View>
      <View className="flex-row items-baseline gap-1">
         <Typography
            className={cn(
               "text-3xl font-black",
               isPrimary ? "text-primary" : "text-white",
            )}
         >
            {value}
         </Typography>
         <Typography className="text-[11px] text-on-surface/40 font-bold uppercase tracking-tighter">
            {subLabel}
         </Typography>
      </View>
   </View>
);

export const TodaySnapshot = ({ data }: { data?: any }) => {
   // Use mock data if no data provided
   const meals = data || [
      {
         label: "Breakfast",
         icon: "🌅",
         myMeals: 1,
         groupJoined: 8,
         total: 12,
         active: true,
      },
      {
         label: "Lunch",
         icon: "🍱",
         myMeals: 1, // User also logged lunch in this scenario for testing prominence
         groupJoined: 10,
         total: 12,
         upcoming: true,
      },
      {
         label: "Dinner",
         icon: "🍽️",
         myMeals: 0,
         groupJoined: 0,
         total: 12,
      },
   ];

   const totalMyMeals = meals.reduce(
      (sum: number, meal: any) => sum + meal.myMeals,
      0,
   );
   const totalGroupJoined = meals.reduce(
      (sum: number, meal: any) => sum + meal.groupJoined,
      0,
   );

   return (
      <View className="my-6">
         <View className="flex-row items-center justify-between mb-6">
            <View>
               <Typography className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                  Daily Pulse
               </Typography>
               <Typography
                  variant="h3"
                  className="font-bold text-on-surface text-xl"
               >
                  Today · April 5
               </Typography>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-surface-container rounded-full items-center justify-center border border-outline/10">
               <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#dae2fd"
               />
            </TouchableOpacity>
         </View>

         {/* Summary Hero Row */}
         <View className="flex-row gap-4 mb-8">
            <SummaryCard
               label="Group Meals"
               value={totalGroupJoined}
               subLabel="Logged"
               icon="account-group"
            />
            <SummaryCard
               label="My Meals"
               value={totalMyMeals}
               subLabel="Today"
               icon="account-check"
               isPrimary
            />
         </View>

         <Typography className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-4 ml-1">
            Breakdown
         </Typography>

         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
         >
            {meals.map((meal: any, index: number) => (
               <MealShot
                  key={index}
                  {...meal}
               />
            ))}
         </ScrollView>
      </View>
   );
};
