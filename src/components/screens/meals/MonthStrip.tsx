import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { format, setMonth, getMonth, getYear } from "date-fns";
import { Colors } from "@/constants/colors";

interface MonthStripProps {
   selectedMonth: Date;
   onMonthChange: (monthIndex: number) => void;
   onYearPress: () => void;
}

export const MonthStrip = ({ selectedMonth, onMonthChange, onYearPress }: MonthStripProps) => {
   // Generate 12 months for the current year
   const months = Array.from({ length: 12 }).map((_, i) => setMonth(new Date(selectedMonth), i));

   const currentMonthIdx = getMonth(new Date());
   const currentYear = getYear(selectedMonth);

   return (
      <View className="mb-6 px-6 flex-row items-center">
         {/* Compact Year/Calendar Trigger */}
         <TouchableOpacity
            onPress={onYearPress}
            className="h-11 px-3 rounded-2xl bg-surface-container border border-primary/20 items-center justify-center mr-3 active:scale-95 flex-row gap-1.5"
         >
            <MaterialCommunityIcons name="calendar-edit" size={18} color={Colors.icon.primary} />
            <Typography className="text-xs font-black text-on-surface">{currentYear}</Typography>
         </TouchableOpacity>

         <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {months.map((monthDate, index) => {
               const isSelected = getMonth(selectedMonth) === index;
               const isCurrentMonth =
                  index === currentMonthIdx &&
                  getYear(new Date()) === currentYear &&
                  getMonth(selectedMonth) !== index;

               return (
                  <TouchableOpacity
                     key={index}
                     onPress={() => onMonthChange(index)}
                     className={cn(
                        "px-5 h-11 rounded-2xl items-center justify-center mr-2 border",
                        isSelected
                           ? "bg-primary border-primary"
                           : "bg-surface-container border-outline/10",
                     )}
                  >
                     <Typography
                        className={cn(
                           "text-xs font-bold uppercase tracking-widest",
                           isSelected ? "text-background" : "text-secondary-300",
                        )}
                     >
                        {format(monthDate, "MMM")}
                     </Typography>
                     {isCurrentMonth && (
                        <View className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                     )}
                  </TouchableOpacity>
               );
            })}
         </ScrollView>
      </View>
   );
};
