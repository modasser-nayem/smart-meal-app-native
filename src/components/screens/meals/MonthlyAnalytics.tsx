import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import QuickMealsViewCard from "./QuickMealsViewCard";

const MemberParticipationRow = ({ name, meals, rank, avatar, isTop }: any) => (
   <View
      className={cn(
         "flex-row items-center justify-between p-4 bg-surface-container rounded-[24px] border-l-4 mb-3 border border-outline/5",
         isTop ? "border-primary" : "border-outline/20",
      )}
   >
      <View className="flex-row items-center gap-3">
         <Image
            source={{ uri: avatar }}
            className="w-10 h-10 rounded-full bg-surface-container-highest"
         />
         <View>
            <Typography className="font-bold text-on-surface leading-tight text-sm">
               {name}
            </Typography>
            <View className="flex-row items-center gap-2 mt-0.5">
               <Typography className="text-[9px] text-on-surface-variant font-black uppercase tracking-tighter">
                  Rank: #{rank}
               </Typography>
            </View>
         </View>
      </View>
      <View className="items-end">
         <Typography className="text-[9px] text-on-surface-variant block mb-0.5 uppercase font-bold tracking-tighter">
            Total Meals
         </Typography>
         <Typography className={cn("text-xl font-black text-primary")}>
            {meals}
         </Typography>
      </View>
   </View>
);

export const MonthlyAnalytics = ({
   selectedMonth,
}: {
   selectedMonth: Date;
}) => {
   // Defensive check for date validity
   const dateObj = isValid(selectedMonth) ? selectedMonth : new Date();

   // MOCK DATA
   const myMonthlyTotal = 42;
   const groupMonthlyTotal = 412;

   const members = [
      {
         name: "Sara",
         meals: 82,
         rank: 1,
         avatar: "https://i.pravatar.cc/150?u=sara",
         isTop: true,
      },
      {
         name: "Ali",
         meals: 65,
         rank: 2,
         avatar: "https://i.pravatar.cc/150?u=ali",
      },
      {
         name: "Hana",
         meals: 58,
         rank: 3,
         avatar: "https://i.pravatar.cc/150?u=hana",
      },
      {
         name: "Rahim",
         meals: 52,
         rank: 4,
         avatar: "https://i.pravatar.cc/150?u=rahim",
      },
      {
         name: "Karim",
         meals: 45,
         rank: 5,
         avatar: "https://i.pravatar.cc/150?u=karim",
      },
      {
         name: "Nayem",
         meals: 38,
         rank: 6,
         avatar: "https://i.pravatar.cc/150?u=nayem",
      },
      {
         name: "Zayn",
         meals: 32,
         rank: 7,
         avatar: "https://i.pravatar.cc/150?u=zayn",
      },
   ];

   return (
      <ScrollView
         className="flex-1"
         showsVerticalScrollIndicator={false}
      >
         <View className="px-6 space-y-8 pb-32 pt-4">
            {/* Monthly Branding & Context */}
            <View className="bg-surface-container p-4 rounded-3xl border border-primary/20 flex-row items-center justify-between">
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
            </View>

            <QuickMealsViewCard
               myTotalMeals={myMonthlyTotal}
               groupTotalMeals={groupMonthlyTotal}
            />

            {/* Member Leaderboard */}
            <View>
               <View className="flex-row justify-between items-center mb-6">
                  <View>
                     <Typography className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                        Attendance Leaderboard
                     </Typography>
                     <Typography className="text-[10px] font-bold text-on-surface-variant uppercase mt-1">
                        Ranked by monthly totals
                     </Typography>
                  </View>
               </View>
               {members.map((member, idx) => (
                  <MemberParticipationRow
                     key={idx}
                     {...member}
                  />
               ))}
            </View>

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
      </ScrollView>
   );
};
