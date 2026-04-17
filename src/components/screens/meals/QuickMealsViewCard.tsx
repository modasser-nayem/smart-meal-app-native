import { TouchableOpacity, View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface QuickMealsViewCardProps {
   myTotalMeals: number;
   groupTotalMeals: number;
   onAddMeal?: () => void;
}

const SummaryCard = ({ label, value, subLabel, icon, isPrimary, onPress, isAddButton }: any) => (
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
               isPrimary ? "bg-primary/20" : "bg-surface",
            )}
         >
            <MaterialCommunityIcons
               name={icon as any}
               size={16}
               color={isPrimary ? "#F59E0B" : "#94A3B8"}
            />
         </View>
         <Typography className="text-[10px] font-bold uppercase tracking-widest text-secondary-400">
            {label}
         </Typography>
      </View>

      <View className="flex-row items-center justify-between">
         <View className="flex-row items-baseline gap-1">
            <Typography
               className={cn("text-3xl font-black", isPrimary ? "text-primary" : "text-on-surface")}
            >
               {value}
            </Typography>
            <Typography className="text-[11px] text-secondary-400 font-bold uppercase tracking-tighter">
               {subLabel}
            </Typography>
         </View>

         {isAddButton && (
            <TouchableOpacity
               onPress={onPress}
               activeOpacity={0.75}
               className="w-9 h-9 rounded-xl bg-primary/20 items-center justify-center active:scale-90"
            >
               <MaterialCommunityIcons name="plus" size={20} color="#F59E0B" />
            </TouchableOpacity>
         )}
      </View>
   </View>
);

const QuickMealsViewCard = ({
   myTotalMeals,
   groupTotalMeals,
   onAddMeal,
}: QuickMealsViewCardProps) => {
   return (
      <View className="flex-row gap-4 mb-4">
         <SummaryCard
            label="My Meals"
            value={myTotalMeals}
            subLabel="meals"
            icon="account-check"
            isPrimary
            isAddButton
            onPress={onAddMeal}
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
