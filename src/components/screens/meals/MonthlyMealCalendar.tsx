import { View, Image, ScrollView } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { 
   format, 
   startOfMonth, 
   endOfMonth, 
   eachDayOfInterval, 
   isToday,
   isSameDay
} from "date-fns";
import { cn } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MonthlyMealLedgerProps {
   selectedMonth: Date;
}

const MealStatus = ({ type, active }: { type: 'B' | 'L' | 'D', active: boolean }) => (
   <View className={cn(
      "w-5 h-5 rounded-md items-center justify-center border",
      active ? "bg-primary/20 border-primary/40" : "bg-surface-container-highest/20 border-outline/5"
   )}>
      <Typography className={cn(
         "text-[8px] font-black",
         active ? "text-primary" : "text-on-surface/20"
      )}>
         {type}
      </Typography>
   </View>
);

export const MonthlyMealLedger = ({ selectedMonth }: MonthlyMealLedgerProps) => {
   const monthStart = startOfMonth(selectedMonth);
   const monthEnd = endOfMonth(monthStart);

   const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
   }).reverse(); // Latest days first usually feels more natural for a ledger

   // MOCK DATA: Map of date string to participating members
   const mockLedgerData: Record<string, any[]> = {
      [format(new Date(), 'yyyy-MM-dd')]: [
         { id: '1', name: 'You', avatar: 'https://i.pravatar.cc/150?u=ali', meals: ['B', 'L', 'D'], isMe: true },
         { id: '2', name: 'Rahim', avatar: 'https://i.pravatar.cc/150?u=rahim', meals: ['B', 'L'] },
         { id: '3', name: 'Sara', avatar: 'https://i.pravatar.cc/150?u=sara', meals: ['L', 'D'] },
      ],
      [format(new Date(Date.now() - 86400000), 'yyyy-MM-dd')]: [
         { id: '1', name: 'You', avatar: 'https://i.pravatar.cc/150?u=ali', meals: ['L', 'D'], isMe: true },
         { id: '2', name: 'Rahim', avatar: 'https://i.pravatar.cc/150?u=rahim', meals: ['B', 'L', 'D'] },
      ],
   };

   return (
      <View className="space-y-4">
         {days.map((day, idx) => {
            const dayKey = format(day, 'yyyy-MM-dd');
            const participants = mockLedgerData[dayKey] || [];
            const isTodayDate = isToday(day);
            const isSelected = isSameDay(day, selectedMonth);

            return (
               <View 
                  key={idx}
                  className={cn(
                     "flex-row rounded-[32px] p-4 border mb-3 overflow-hidden",
                     isSelected ? "bg-primary/10 border-primary/30" : "bg-surface-container border-outline/5"
                  )}
               >
                  {/* Date Column */}
                  <View className="items-center justify-center pr-4 border-r border-outline/10 w-16">
                     <Typography className={cn(
                        "text-[10px] font-black uppercase tracking-widest leading-none",
                        isTodayDate ? "text-primary" : "text-on-surface/40"
                     )}>
                        {format(day, "EEE")}
                     </Typography>
                     <Typography className={cn(
                        "text-2xl font-black mt-1 leading-none",
                        isSelected ? "text-primary" : "text-on-surface"
                     )}>
                        {format(day, "d")}
                     </Typography>
                  </View>

                  {/* Participation Content */}
                  <View className="flex-1 pl-4 justify-center">
                     {participants.length > 0 ? (
                        <View className="flex-row items-center flex-wrap gap-3">
                           {participants.map((p, pIdx) => (
                              <View key={pIdx} className="flex-row items-center bg-surface-container-highest/30 rounded-xl px-2 py-1.5 border border-outline/5 space-x-2">
                                 <Image source={{ uri: p.avatar }} className="w-5 h-5 rounded-lg" />
                                 <View className="flex-row space-x-0.5">
                                    <MealStatus type="B" active={p.meals.includes('B')} />
                                    <MealStatus type="L" active={p.meals.includes('L')} />
                                    <MealStatus type="D" active={p.meals.includes('D')} />
                                 </View>
                              </View>
                           ))}
                           {participants.length > 5 && (
                              <Typography className="text-[10px] font-bold text-primary">
                                 +{participants.length - 5} more
                              </Typography>
                           )}
                        </View>
                     ) : (
                        <View className="flex-row items-center space-x-2 opacity-30">
                           <MaterialCommunityIcons name="calendar-blank" size={14} color="#94A3B8" />
                           <Typography className="text-xs font-bold text-on-surface">No recordings</Typography>
                        </View>
                     )}
                  </View>
               </View>
            );
         })}
      </View>
   );
};
