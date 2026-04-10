import { View, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Typography } from "@/components/ui/Typography";
import { format, isValid } from "date-fns";
import QuickMealsViewCard from "./QuickMealsViewCard";
import MembersMealParticipation from "./MembersMealParticipation";
import { MonthStrip } from "./MonthStrip";
import { MonthlyMealLedger } from "./MonthlyMealCalendar";
import { MonthlyMealMatrix } from "./MonthlyMealMatrix";
import { cn } from "@/lib/utils";

export const MonthlyAnalytics = ({
   selectedMonth,
   onMonthChange,
   onYearPress,
}: {
   selectedMonth: Date;
   onMonthChange: (monthIndex: number) => void;
   onYearPress: () => void;
}) => {
   const [viewMode, setViewMode] = useState<"summary" | "matrix">(
      "summary",
   );
   // Defensive check for date validity
   const dateObj = isValid(selectedMonth) ? selectedMonth : new Date();

   // MOCK DATA
   const myMonthlyTotal = 42;
   const groupMonthlyTotal = 412;

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

   // 1. GENERATE THE SUPER WORKBOOK
   const workbook: LedgerWorkbook = (function generateWorkbook() {
      const members: Member[] = [
         { id: "1", name: "You", role: "Member", avatar: "https://i.pravatar.cc/150?u=me", isMe: true },
         { id: "2", name: "Rahim", role: "Manager", avatar: "https://i.pravatar.cc/150?u=rahim" },
         { id: "3", name: "Ali", role: "Member", avatar: "https://i.pravatar.cc/150?u=ali" },
         { id: "4", name: "Karim", role: "Member", avatar: "https://i.pravatar.cc/150?u=karim" },
         { id: "5", name: "Sara", role: "Guest", avatar: "https://i.pravatar.cc/150?u=sara" },
         { id: "6", name: "Amina", role: "Member", avatar: "https://i.pravatar.cc/150?u=amina" },
         { id: "7", name: "David", role: "Member", avatar: "https://i.pravatar.cc/150?u=david" },
         { id: "8", name: "Lisa", role: "Member", avatar: "https://i.pravatar.cc/150?u=lisa" },
      ];

      const days: DayRecord[] = [];
      const grandTotals: Record<string, number> = {};
      let totalGroupMeals = 0;

      members.forEach((m) => (grandTotals[m.id] = 0));

      const monthDays = 31;
      for (let i = 1; i <= monthDays; i++) {
         const d = new Date(2026, 3, i); // April 2026
         const dateKey = format(d, "yyyy-MM-dd");
         const participations: Record<string, MealCounts> = {};
         let dailyTotal = 0;

         members.forEach((m) => {
            const hash = (i + parseInt(m.id)) % 10;
            const counts = {
               b: hash % 3 === 0 ? 1 : 0,
               l: hash % 2 === 0 ? (hash % 4 === 0 ? 2 : 1) : 1,
               d: hash % 5 === 0 ? 1 : 0,
            };
            participations[m.id] = counts;
            const sum = counts.b + counts.l + counts.d;
            grandTotals[m.id] += sum;
            dailyTotal += sum;
            totalGroupMeals += sum;
         });

         days.push({
            date: dateKey,
            dayNum: i.toString(),
            dayName: format(d, "EEE"),
            dailyTotal,
            participations,
         });
      }

      return { members, days, grandTotals, totalGroupMeals };
   })();

   interface MatrixMember extends Member {
      total: number;
      breakfast: number;
      lunch: number;
      dinner: number;
   }

   // 2. DERIVE SUMMARY DATA FOR THE LEADERBOARD
   const summaryMembers: MatrixMember[] = workbook.members.map((m) => {
      let breakfast = 0;
      let lunch = 0;
      let dinner = 0;

      workbook.days.forEach((day) => {
         const p = day.participations[m.id];
         if (p) {
            breakfast += p.b;
            lunch += p.l;
            dinner += p.d;
         }
      });

      return {
         ...m,
         total: workbook.grandTotals[m.id] || 0,
         breakfast,
         lunch,
         dinner,
      };
   });

   return (
      <ScrollView
         className="flex-1"
         showsVerticalScrollIndicator={false}
      >
         <View className="pb-32 pt-4">
            <MonthStrip
               selectedMonth={dateObj}
               onMonthChange={onMonthChange}
               onYearPress={onYearPress}
            />
            <View className="px-6 space-y-8">
               {/* Summary Hero Row */}
               <QuickMealsViewCard
                  myTotalMeals={myMonthlyTotal}
                  groupTotalMeals={groupMonthlyTotal}
               />

               {/* View Switcher: Summary, Matrix */}
               <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row bg-surface-container rounded-2xl p-1 border border-outline/5 space-x-1">
                     <TouchableOpacity
                        onPress={() => setViewMode("summary")}
                        className={cn(
                           "px-4 py-2 rounded-xl items-center justify-center",
                           viewMode === "summary"
                              ? "bg-primary"
                              : "bg-transparent",
                        )}
                     >
                        <Typography
                           className={cn(
                              "text-[8px] font-black uppercase tracking-widest",
                              viewMode === "summary"
                                 ? "text-surface"
                                 : "text-on-surface/40",
                           )}
                        >
                           Summary
                        </Typography>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => setViewMode("matrix")}
                        className={cn(
                           "px-4 py-2 rounded-xl items-center justify-center",
                           viewMode === "matrix"
                              ? "bg-primary"
                              : "bg-transparent",
                        )}
                     >
                        <Typography
                           className={cn(
                              "text-[8px] font-black uppercase tracking-widest",
                              viewMode === "matrix"
                                 ? "text-surface"
                                 : "text-on-surface/40",
                           )}
                        >
                           Matrix
                        </Typography>
                     </TouchableOpacity>
                  </View>
                  <Typography className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                     {viewMode === "summary"
                        ? "Leaderboard"
                        : "Full Sheets"}
                  </Typography>
               </View>

                {viewMode === "summary" && (
                  <MembersMealParticipation members={summaryMembers} />
               )}
               {viewMode === "matrix" && (
                  <MonthlyMealMatrix
                     workbook={workbook}
                  />
               )}

               {/* Finalize Month Actions */}
               <View className="pt-4 space-y-4">
                  <TouchableOpacity className="w-full h-14 rounded-[24px] bg-primary/10 border border-primary/20 items-center justify-center active:bg-primary/20">
                     <Typography className="text-primary font-black uppercase tracking-widest text-xs">
                        Generate Monthly Report
                     </Typography>
                  </TouchableOpacity>
                  <Typography className="text-[11px] text-on-surface text-center px-4 font-medium leading-tight opacity-50">
                     Participation statistics for the selected period.
                  </Typography>
               </View>
            </View>
         </View>
      </ScrollView>
   );
};
