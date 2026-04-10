import { View, ScrollView, Image } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
   participations: Record<string, MealCounts>; // memberId -> counts
   dailyTotal: number;
}

interface LedgerWorkbook {
   members: Member[];
   days: DayRecord[];
   grandTotals: Record<string, number>; // memberId -> total
   totalGroupMeals: number;
}

interface MonthlyMealMatrixProps {
   workbook: LedgerWorkbook;
}

const MealTypeLabel = ({
   type,
}: {
   type: "Breakfast" | "Lunch" | "Dinner";
}) => {
   const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
      Breakfast: "weather-sunset",
      Lunch: "weather-sunny",
      Dinner: "weather-night",
   };

   return (
      <View className="flex-row items-center gap-1.5 px-2">
         <MaterialCommunityIcons
            name={icons[type]}
            size={12}
            color="#F59E0B"
         />
         <Typography className="text-[10px] font-black uppercase text-on-surface/40 tracking-tighter">
            {type}
         </Typography>
      </View>
   );
};

const QtyText = ({
   value,
   isTotal = false,
}: {
   value: number | string;
   isTotal?: boolean;
}) => {
   const isMissed = value === "x" || value === 0;

   return (
      <Typography
         className={cn(
            "text-base font-black",
            isTotal
               ? "text-primary"
               : isMissed
                 ? "text-red-500"
                 : "text-on-surface",
         )}
      >
         {value === 0 ? "x" : value}
      </Typography>
   );
};

export const MonthlyMealMatrix = ({ workbook }: MonthlyMealMatrixProps) => {
   const { members, days, grandTotals } = workbook;

   const colWidth = 100; // Width for each person column
   const dateColWidth = 80;
   const mealColWidth = 90; // Slightly wider for icons
   const totalColWidth = 80;
   const totalTableWidth =
      dateColWidth + mealColWidth + members.length * colWidth + totalColWidth;

   return (
      <View className="bg-surface-container/30 rounded-[16px] border border-outline/5 overflow-hidden">
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
         >
            <View style={{ width: totalTableWidth }}>
               {/* Fixed Table Header */}
               <View className="flex-row border-b border-outline/10 bg-surface-container-highest/20 h-16">
                  <View
                     style={{ width: dateColWidth }}
                     className="items-center justify-center border-r border-outline/5"
                  >
                     <Typography className="text-[10px] font-black uppercase text-on-surface/40">
                        Date
                     </Typography>
                  </View>
                  <View
                     style={{ width: mealColWidth }}
                     className="items-center justify-center border-r border-outline/5"
                  >
                     <Typography className="text-[10px] font-black uppercase text-on-surface/40">
                        Meals
                     </Typography>
                  </View>
                  {members.map((member) => (
                     <View
                        key={member.id}
                        style={{ width: colWidth }}
                        className="items-center justify-center border-r border-outline/5 px-2"
                     >
                        <View className="items-center gap-1">
                           <Image
                              source={{ uri: member.avatar }}
                              className="w-6 h-6 rounded-full"
                           />
                           <Typography
                              className="text-[9px] font-black text-on-surface uppercase text-center"
                              numberOfLines={1}
                           >
                              {member.name === "You"
                                 ? "You"
                                 : member.name.split(" ")[0]}
                           </Typography>
                        </View>
                     </View>
                  ))}
                  <View
                     style={{ width: totalColWidth }}
                     className="items-center justify-center bg-primary/5"
                  >
                     <Typography className="text-[10px] font-black uppercase text-primary tracking-widest">
                        Total
                     </Typography>
                  </View>
               </View>

               {/* Table Body (Daily Rows) - Now expands to show full month */}
               <View>
                  {days.map((dayRecord, dIdx) => {
                     const isEven = dIdx % 2 === 0;

                     return (
                        <View
                           key={dayRecord.date}
                           className={cn(
                              "flex-row border-b border-outline/10",
                              isEven
                                 ? "bg-surface-container/40"
                                 : "bg-transparent",
                           )}
                        >
                           {/* Date Block */}
                           <View
                              style={{ width: dateColWidth }}
                              className="items-center justify-center border-r border-outline/5"
                           >
                              <Typography className="text-[10px] font-black uppercase text-on-surface/30">
                                 {dayRecord.dayName}
                              </Typography>
                              <Typography className="text-2xl font-black text-on-surface mt-1">
                                 {dayRecord.dayNum}
                              </Typography>
                           </View>

                           {/* Meal Rows Container */}
                           <View className="flex-1">
                              {/* Breakfast Row */}
                              <View className="flex-row border-b border-outline/5 h-14">
                                 <View
                                    style={{ width: mealColWidth }}
                                    className="items-center justify-center border-r border-outline/5"
                                 >
                                    <MealTypeLabel type="Breakfast" />
                                 </View>
                                 {members.map((m) => (
                                    <View
                                       key={m.id}
                                       style={{ width: colWidth }}
                                       className="items-center justify-center border-r border-outline/5"
                                    >
                                       <QtyText
                                          value={
                                             dayRecord.participations[m.id]
                                                ?.b ?? 0
                                          }
                                       />
                                    </View>
                                 ))}
                                 <View
                                    style={{ width: totalColWidth }}
                                    className="items-center justify-center bg-primary/5"
                                 />
                              </View>

                              {/* Lunch Row */}
                              <View className="flex-row border-b border-outline/5 h-14">
                                 <View
                                    style={{ width: mealColWidth }}
                                    className="items-center justify-center border-r border-outline/5"
                                 >
                                    <MealTypeLabel type="Lunch" />
                                 </View>
                                 {members.map((m) => (
                                    <View
                                       key={m.id}
                                       style={{ width: colWidth }}
                                       className="items-center justify-center border-r border-outline/5"
                                    >
                                       <QtyText
                                          value={
                                             dayRecord.participations[m.id]
                                                ?.l ?? 0
                                          }
                                       />
                                    </View>
                                 ))}
                                 <View
                                    style={{ width: totalColWidth }}
                                    className="items-center justify-center bg-primary/5"
                                 >
                                    <QtyText
                                       value={dayRecord.dailyTotal}
                                       isTotal
                                    />
                                 </View>
                              </View>

                              {/* Dinner Row */}
                              <View className="flex-row h-14">
                                 <View
                                    style={{ width: mealColWidth }}
                                    className="items-center justify-center border-r border-outline/5"
                                 >
                                    <MealTypeLabel type="Dinner" />
                                 </View>
                                 {members.map((m) => (
                                    <View
                                       key={m.id}
                                       style={{ width: colWidth }}
                                       className="items-center justify-center border-r border-outline/5"
                                    >
                                       <QtyText
                                          value={
                                             dayRecord.participations[m.id]
                                                ?.d ?? 0
                                          }
                                       />
                                    </View>
                                 ))}
                                 <View
                                    style={{ width: totalColWidth }}
                                    className="items-center justify-center bg-primary/5"
                                 />
                              </View>
                           </View>
                        </View>
                     );
                  })}
               </View>

               {/* Sticky Grand Total Footer (Outside Vertical Scroll) */}
               <View className="flex-row bg-surface-container-highest/50 h-20 border-t-4 border-primary/20">
                  <View
                     style={{ width: dateColWidth + mealColWidth }}
                     className="items-center justify-center border-r border-outline/10 px-4"
                  >
                     <Typography className="text-xs font-black uppercase text-primary text-center">
                        Monthly Total
                     </Typography>
                  </View>
                  {members.map((m) => (
                     <View
                        key={m.id}
                        style={{ width: colWidth }}
                        className="items-center justify-center border-r border-outline/5"
                     >
                        <Typography className="text-xl font-black text-primary">
                           {grandTotals[m.id] || 0}
                        </Typography>
                        <Typography className="text-[8px] font-bold text-on-surface/40 uppercase mt-1">
                           Meals
                        </Typography>
                     </View>
                  ))}
                  <View
                     style={{ width: totalColWidth }}
                     className="items-center justify-center bg-primary"
                  >
                     <Typography className="text-[10px] font-black text-on-primary uppercase mb-1">
                        Grand
                     </Typography>
                     <Typography className="text-xl font-black text-on-primary">
                        {workbook.totalGroupMeals}
                     </Typography>
                  </View>
               </View>
            </View>
         </ScrollView>

         {/* Legend / Info */}
         <View className="flex-row items-center justify-between p-4 bg-background/20 border-t border-outline/5">
            <Typography className="text-[9px] font-black text-on-surface/40 uppercase tracking-[0.1em]">
               Comprehensive Audit Ledger
            </Typography>
            <View className="flex-row items-center gap-4">
               <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  <Typography className="text-[8px] font-bold text-on-surface/40 uppercase">
                     Missed
                  </Typography>
               </View>
               <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-primary/80 mr-2" />
                  <Typography className="text-[8px] font-bold text-on-surface/40 uppercase">
                     Sticky Totals
                  </Typography>
               </View>
            </View>
         </View>
      </View>
   );
};
