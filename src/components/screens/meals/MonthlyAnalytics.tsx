import { View, TouchableOpacity } from "react-native";
import { useState, useMemo } from "react";
import { Typography } from "@/components/ui/Typography";
import { format, isValid } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QuickMealsViewCard from "./QuickMealsViewCard";
import MembersMealParticipation from "./MembersMealParticipation";
import { MonthStrip } from "./MonthStrip";
import { MonthlyMealMatrix } from "./MonthlyMealMatrix";

export const MonthlyAnalytics = ({
   selectedMonth,
   onMonthChange,
   onYearPress,
}: {
   selectedMonth: Date;
   onMonthChange: (monthIndex: number) => void;
   onYearPress: () => void;
}) => {
   const [viewMode, setViewMode] = useState<"summary" | "matrix">("summary");
   const dateObj = isValid(selectedMonth) ? selectedMonth : new Date();

   const myMonthlyTotal = 42;
   const groupMonthlyTotal = 412;

   // ── Workbook — only recomputes when selectedMonth changes ──────────────────
   const workbook = useMemo(() => {
      const members = [
         {
            id: "1",
            name: "You",
            role: "Member",
            avatar: "https://i.pravatar.cc/150?u=me",
            isMe: true,
         },
         { id: "2", name: "Rahim", role: "Manager", avatar: "https://i.pravatar.cc/150?u=rahim" },
         { id: "3", name: "Ali", role: "Member", avatar: "https://i.pravatar.cc/150?u=ali" },
         { id: "4", name: "Karim", role: "Member", avatar: "https://i.pravatar.cc/150?u=karim" },
         { id: "5", name: "Sara", role: "Guest", avatar: "https://i.pravatar.cc/150?u=sara" },
         { id: "6", name: "Amina", role: "Member", avatar: "https://i.pravatar.cc/150?u=amina" },
         { id: "7", name: "David", role: "Member", avatar: "https://i.pravatar.cc/150?u=david" },
         { id: "8", name: "Lisa", role: "Member", avatar: "https://i.pravatar.cc/150?u=lisa" },
      ];

      const days: {
         date: string;
         dayNum: string;
         dayName: string;
         participations: Record<string, { b: number; l: number; d: number }>;
         dailyTotal: number;
      }[] = [];
      const grandTotals: Record<string, number> = {};
      let totalGroupMeals = 0;

      members.forEach((m) => (grandTotals[m.id] = 0));

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
         const d = new Date(year, month, i);
         const participations: Record<string, { b: number; l: number; d: number }> = {};
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
            date: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
            dayNum: String(i),
            dayName: format(d, "EEE"),
            dailyTotal,
            participations,
         });
      }

      return { members, days, grandTotals, totalGroupMeals };
   }, [dateObj.getFullYear(), dateObj.getMonth()]);

   // ── Summary members — derived from workbook, also memoized ─────────────────
   const summaryMembers = useMemo(
      () =>
         workbook.members.map((m) => {
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
            return { ...m, total: workbook.grandTotals[m.id] || 0, breakfast, lunch, dinner };
         }),
      [workbook],
   );

   return (
      <View className="pb-32 pt-4">
         <MonthStrip
            selectedMonth={dateObj}
            onMonthChange={onMonthChange}
            onYearPress={onYearPress}
         />
         <View className="px-6 gap-6">
            <QuickMealsViewCard myTotalMeals={myMonthlyTotal} groupTotalMeals={groupMonthlyTotal} />

            {/* Inner view switcher */}
            <View className="flex-row items-center justify-between">
               <View className="flex-row bg-surface-container rounded-2xl p-1 border border-outline/10">
                  <TouchableOpacity
                     onPress={() => setViewMode("summary")}
                     className={`px-4 py-2 rounded-xl items-center justify-center ${
                        viewMode === "summary" ? "bg-primary" : "bg-transparent"
                     }`}
                  >
                     <Typography
                        className={`text-[10px] font-black uppercase tracking-widest ${
                           viewMode === "summary" ? "text-background" : "text-secondary-400"
                        }`}
                     >
                        Summary
                     </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => setViewMode("matrix")}
                     className={`px-4 py-2 rounded-xl items-center justify-center ${
                        viewMode === "matrix" ? "bg-primary" : "bg-transparent"
                     }`}
                  >
                     <Typography
                        className={`text-[10px] font-black uppercase tracking-widest ${
                           viewMode === "matrix" ? "text-background" : "text-secondary-400"
                        }`}
                     >
                        Full Matrix
                     </Typography>
                  </TouchableOpacity>
               </View>
               <Typography className="text-[10px] font-black text-secondary-300 uppercase tracking-widest">
                  {viewMode === "summary" ? "Leaderboard" : "Audit Sheet"}
               </Typography>
            </View>

            {viewMode === "summary" && <MembersMealParticipation members={summaryMembers} />}
            {viewMode === "matrix" && <MonthlyMealMatrix workbook={workbook} />}

            {/* Export Report */}
            <TouchableOpacity
               onPress={() => {}}
               activeOpacity={0.8}
               className="w-full h-14 rounded-3xl bg-surface-container border border-outline/10 items-center justify-center flex-row gap-2.5 active:bg-surface"
            >
               <View className="w-8 h-8 rounded-xl bg-info/10 items-center justify-center">
                  <MaterialCommunityIcons name="file-export-outline" size={18} color="#3B82F6" />
               </View>
               <Typography className="text-on-surface font-bold text-sm">
                  Export Monthly Report
               </Typography>
               <Typography className="text-secondary-400 text-xs">· PDF / CSV</Typography>
            </TouchableOpacity>
         </View>
      </View>
   );
};
