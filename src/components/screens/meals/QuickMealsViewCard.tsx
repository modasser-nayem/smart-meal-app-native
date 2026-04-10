import { TouchableOpacity, View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface QuickMealsViewCardProps {
   myTotalMeals: number;
   groupTotalMeals: number;
}

const SummaryCard = ({
   label,
   value,
   subLabel,
   icon,
   isPrimary,
   onPress,
   isAddButton,
}: any) => (
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

      {!isAddButton ? (
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
      ) : (
         <View className="flex-row items-center justify-between">
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

            {/* plus button for add meal */}
            <TouchableOpacity onPress={onPress}>
               <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={isPrimary ? "#F59E0B" : "#94A3B8"}
               />
            </TouchableOpacity>
         </View>
      )}
   </View>
);

const QuickMealsViewCard = ({
   myTotalMeals,
   groupTotalMeals,
}: QuickMealsViewCardProps) => {
   return (
      <View className="flex-row gap-4 mb-4">
         <SummaryCard
            label="My Meals"
            value={myTotalMeals}
            subLabel="meals"
            icon="account-check"
            isPrimary
            isAddButton={true}
         />
         <SummaryCard
            label="Group Meals"
            value={groupTotalMeals}
            subLabel="meals"
            icon="account-group"
            isAddButton={false}
         />
      </View>
   );
};

export default QuickMealsViewCard;
