import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { format, addDays, subDays, isSameDay } from "date-fns";

interface DateStripProps {
   selectedDate: Date;
   onDateChange: (date: Date) => void;
   onCalendarPress: () => void;
}

export const DateStrip = ({ selectedDate, onDateChange, onCalendarPress }: DateStripProps) => {
   const dates = Array.from({ length: 7 }).map((_, i) => addDays(subDays(selectedDate, 3), i));

   // Show month label if dates span two months
   const firstMonth = format(dates[0], "MMM");
   const lastMonth = format(dates[dates.length - 1], "MMM");
   const monthLabel =
      firstMonth === lastMonth
         ? format(selectedDate, "MMMM yyyy")
         : `${firstMonth} – ${lastMonth} ${format(selectedDate, "yyyy")}`;

   return (
      <View className="mb-4 px-6">
         {/* Month context label */}
         <Typography className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
            {monthLabel}
         </Typography>

         <View className="flex-row items-center">
            <TouchableOpacity
               onPress={onCalendarPress}
               className="w-[52px] h-[52px] rounded-2xl bg-surface-container border border-primary/20 items-center justify-center mr-3 active:scale-95"
            >
               <MaterialCommunityIcons name="calendar-month" size={22} color="#F59E0B" />
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
               {dates.map((date, index) => {
                  const isSelected = isSameDay(date, selectedDate);
                  const isToday = isSameDay(date, new Date());

                  return (
                     <TouchableOpacity
                        key={index}
                        onPress={() => onDateChange(date)}
                        className={cn(
                           "w-[52px] h-[52px] rounded-2xl items-center justify-center mr-3 border",
                           isSelected
                              ? "bg-primary border-primary"
                              : "bg-surface-container border-outline/10",
                        )}
                     >
                        <Typography
                           className={cn(
                              "text-[8px] font-bold uppercase tracking-widest",
                              isSelected ? "text-background/80" : "text-secondary-400",
                           )}
                        >
                           {format(date, "EEE")}
                        </Typography>
                        <Typography
                           className={cn(
                              "text-lg font-black mt-0.5",
                              isSelected ? "text-background" : "text-on-surface",
                           )}
                        >
                           {format(date, "d")}
                        </Typography>
                        {isToday && !isSelected && (
                           <View className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                        )}
                     </TouchableOpacity>
                  );
               })}
            </ScrollView>
         </View>
      </View>
   );
};
