import { View, ScrollView, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

interface Member {
   id: string;
   name: string;
   role: string;
   avatar: string;
   isMe?: boolean;
}

interface MealCounts {
   b: number;
   l: number;
   d: number;
}

interface DayRecord {
   date: string;
   dayNum: string;
   dayName: string;
   participations: Record<string, MealCounts>;
   dailyTotal: number;
}

interface LedgerWorkbook {
   members: Member[];
   days: DayRecord[];
   grandTotals: Record<string, number>;
   totalGroupMeals: number;
}

const MEAL_ROWS: { key: keyof MealCounts; icon: string; color: string }[] = [
   { key: "b", icon: "weather-sunset", color: Colors.icon.primary },
   { key: "l", icon: "weather-sunny", color: Colors.icon.success },
   { key: "d", icon: "weather-night", color: Colors.icon.info },
];

const Cell = ({
   value,
   isTotal = false,
   width,
}: {
   value: number | string;
   isTotal?: boolean;
   width: number;
}) => {
   const isMissed = value === 0 || value === "x";
   return (
      <View style={{ width }} className="items-center justify-center border-r border-outline/10">
         <Typography
            className={
               isTotal
                  ? "text-primary font-extrabold text-base"
                  : isMissed
                    ? "text-error text-sm font-bold"
                    : "text-on-surface text-sm font-bold"
            }
         >
            {isMissed && !isTotal ? "–" : value}
         </Typography>
      </View>
   );
};

export const MonthlyMealMatrix = ({ workbook }: { workbook: LedgerWorkbook }) => {
   const { members, days, grandTotals } = workbook;

   const DATE_W = 72;
   const MEAL_W = 80;
   const COL_W = 88;
   const TOTAL_W = 72;
   const ROW_H = 40;
   const totalWidth = DATE_W + MEAL_W + members.length * COL_W + TOTAL_W;

   return (
      <View className="bg-surface-container rounded-3xl border border-outline/10 overflow-hidden">
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ width: totalWidth }}>
               {/* ── Header ── */}
               <View
                  className="flex-row border-b border-outline/10 bg-surface"
                  style={{ height: 56 }}
               >
                  <View
                     style={{ width: DATE_W + MEAL_W }}
                     className="items-center justify-center border-r border-outline/10"
                  >
                     <Typography className="text-secondary-400 text-[10px] font-black uppercase tracking-widest">
                        Date
                     </Typography>
                  </View>
                  {members.map((m) => (
                     <View
                        key={m.id}
                        style={{ width: COL_W }}
                        className="items-center justify-center border-r border-outline/10 px-2"
                     >
                        <View className="w-7 h-7 rounded-full overflow-hidden bg-surface-container border border-outline/20 mb-1">
                           <Image
                              source={{ uri: m.avatar }}
                              className="w-full h-full"
                              resizeMode="cover"
                           />
                        </View>
                        <Typography
                           className="text-[9px] font-black text-on-surface uppercase text-center"
                           numberOfLines={1}
                        >
                           {m.isMe ? "You" : m.name.split(" ")[0]}
                        </Typography>
                     </View>
                  ))}
                  <View
                     style={{ width: TOTAL_W }}
                     className="items-center justify-center bg-primary/10"
                  >
                     <Typography className="text-primary text-[10px] font-black uppercase tracking-widest">
                        Total
                     </Typography>
                  </View>
               </View>

               {/* ── Body ── */}
               {days.map((day, dIdx) => (
                  <View
                     key={day.date}
                     className={`flex-row border-b border-outline/10 ${
                        dIdx % 2 === 0 ? "bg-surface/40" : ""
                     }`}
                     style={{ height: ROW_H * 3 }}
                  >
                     {/* Date block — spans all 3 meal rows */}
                     <View
                        style={{ width: DATE_W, height: ROW_H * 3 }}
                        className="items-center justify-center border-r border-outline/10"
                     >
                        <Typography className="text-secondary-400 text-[9px] font-black uppercase">
                           {day.dayName}
                        </Typography>
                        <Typography className="text-on-surface text-xl font-extrabold mt-0.5">
                           {day.dayNum}
                        </Typography>
                     </View>

                     {/* Meal rows */}
                     <View className="flex-1 flex-col">
                        {MEAL_ROWS.map((meal, mIdx) => (
                           <View
                              key={meal.key}
                              className={`flex-row ${
                                 mIdx < MEAL_ROWS.length - 1 ? "border-b border-outline/10" : ""
                              }`}
                              style={{ height: ROW_H }}
                           >
                              {/* Meal type icon */}
                              <View
                                 style={{ width: MEAL_W }}
                                 className="items-center justify-center border-r border-outline/10"
                              >
                                 <MaterialCommunityIcons
                                    name={meal.icon as any}
                                    size={14}
                                    color={meal.color}
                                 />
                              </View>

                              {/* Per-member values */}
                              {members.map((m) => (
                                 <Cell
                                    key={m.id}
                                    value={day.participations[m.id]?.[meal.key] ?? 0}
                                    width={COL_W}
                                 />
                              ))}

                              {/* Daily total — only on middle (lunch) row, spans visually */}
                              <View
                                 style={{ width: TOTAL_W, height: ROW_H }}
                                 className={`items-center justify-center ${
                                    mIdx === 1 ? "bg-primary/10" : "bg-primary/5"
                                 }`}
                              >
                                 {mIdx === 1 && (
                                    <Typography className="text-primary font-extrabold text-base">
                                       {day.dailyTotal}
                                    </Typography>
                                 )}
                              </View>
                           </View>
                        ))}
                     </View>
                  </View>
               ))}

               {/* ── Grand Total Footer ── */}
               <View
                  className="flex-row bg-surface border-t-2 border-primary/20"
                  style={{ height: 64 }}
               >
                  <View
                     style={{ width: DATE_W + MEAL_W }}
                     className="items-center justify-center border-r border-outline/10"
                  >
                     <Typography className="text-primary text-xs font-black uppercase tracking-widest">
                        Monthly Total
                     </Typography>
                  </View>
                  {members.map((m) => (
                     <View
                        key={m.id}
                        style={{ width: COL_W }}
                        className="items-center justify-center border-r border-outline/10"
                     >
                        <Typography className="text-primary text-xl font-extrabold">
                           {grandTotals[m.id] || 0}
                        </Typography>
                        <Typography className="text-secondary-400 text-[8px] font-bold uppercase mt-0.5">
                           meals
                        </Typography>
                     </View>
                  ))}
                  <View
                     style={{ width: TOTAL_W }}
                     className="items-center justify-center bg-primary"
                  >
                     <Typography className="text-background text-[9px] font-black uppercase mb-0.5">
                        Grand
                     </Typography>
                     <Typography className="text-background text-xl font-extrabold">
                        {workbook.totalGroupMeals}
                     </Typography>
                  </View>
               </View>
            </View>
         </ScrollView>

         {/* Legend */}
         <View className="flex-row items-center justify-between px-4 py-3 border-t border-outline/10">
            <Typography className="text-secondary-400 text-[9px] font-black uppercase tracking-widest">
               Meal Ledger
            </Typography>
            <View className="flex-row items-center gap-4">
               {[
                  { color: Colors.icon.primary, label: "B" },
                  { color: Colors.icon.success, label: "L" },
                  { color: Colors.icon.info, label: "D" },
               ].map(({ color, label }) => (
                  <View key={label} className="flex-row items-center gap-1">
                     <View className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                     <Typography className="text-secondary-400 text-[9px] font-bold uppercase">
                        {label}
                     </Typography>
                  </View>
               ))}
               <View className="flex-row items-center gap-1">
                  <Typography className="text-error text-[9px] font-bold">–</Typography>
                  <Typography className="text-secondary-400 text-[9px] font-bold uppercase">
                     Missed
                  </Typography>
               </View>
            </View>
         </View>
      </View>
   );
};
