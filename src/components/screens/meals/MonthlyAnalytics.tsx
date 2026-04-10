import { View, TouchableOpacity, ScrollView } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { format, isValid } from "date-fns";
import QuickMealsViewCard from "./QuickMealsViewCard";
import MembersMealParticipation from "./MembersMealParticipation";
import { MonthStrip } from "./MonthStrip";

export const MonthlyAnalytics = ({
   selectedMonth,
   onMonthChange,
   onYearPress,
}: {
   selectedMonth: Date;
   onMonthChange: (monthIndex: number) => void;
   onYearPress: () => void;
}) => {
   // Defensive check for date validity
   const dateObj = isValid(selectedMonth) ? selectedMonth : new Date();

   // MOCK DATA
   const myMonthlyTotal = 42;
   const groupMonthlyTotal = 412;

   // MOCK DATA
   const memberData = [
      {
         id: "1",
         name: "You",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=ali",
         total: 3,
         breakfast: 1,
         lunch: 1,
         dinner: 1,
         isMe: true,
      },
      {
         id: "2",
         name: "Rahim",
         role: "Manager",
         avatar: "https://i.pravatar.cc/150?u=rahim",
         total: 4,
         breakfast: 1,
         lunch: 2,
         dinner: 1,
      },
      {
         id: "3",
         name: "Ali",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=ali",
         total: 3,
         breakfast: 1,
         lunch: 1,
         dinner: 1,
      },
      {
         id: "4",
         name: "Karim",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=karim",
         total: 2,
         breakfast: 1,
         lunch: 1,
         dinner: 0,
      },
      {
         id: "5",
         name: "Sara",
         role: "Guest",
         avatar: "https://i.pravatar.cc/150?u=sara",
         total: 6,
         breakfast: 2,
         lunch: 2,
         dinner: 2,
      },
      {
         id: "6",
         name: "Amina",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=amina",
         total: 3,
         breakfast: 0,
         lunch: 2,
         dinner: 1,
      },
      {
         id: "7",
         name: "David",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=david",
         total: 1,
         breakfast: 0,
         lunch: 1,
         dinner: 0,
      },
      {
         id: "8",
         name: "Lisa",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=lisa",
         total: 3,
         breakfast: 1,
         lunch: 1,
         dinner: 1,
      },
      {
         id: "9",
         name: "Jake",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=jake",
         total: 1,
         breakfast: 0,
         lunch: 1,
         dinner: 0,
      },
   ];

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
               {/* Monthly Branding & Context */}
               {/* <View className="bg-surface-container p-4 rounded-3xl border border-primary/20 flex-row items-center justify-between">
                  <View>
                     <Typography className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                        Monthly Summary
                     </Typography>
                     <Typography className="text-xl font-black text-on-surface">
                        {format(dateObj, "MMMM yyyy")}
                     </Typography>
                  </View>
                  <View className="bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                     <Typography className="text-primary text-[10px] font-black uppercase tracking-widest">
                        Participation
                     </Typography>
                  </View>
               </View> */}

               {/* Summary Hero Row */}
               <QuickMealsViewCard
                  myTotalMeals={myMonthlyTotal}
                  groupTotalMeals={groupMonthlyTotal}
               />

               {/* Unified Member List */}
               <MembersMealParticipation members={memberData} />

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
