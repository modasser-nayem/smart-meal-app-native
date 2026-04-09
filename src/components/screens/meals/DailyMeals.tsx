import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { useGetProfileQuery } from "@/api/userApi";
import { format, isToday } from "date-fns";
import QuickMealsViewCard from "./QuickMealsViewCard";
import MemberSummaryItem from "./MemberSummaryItem";

export const DailyMeals = ({ selectedDate }: { selectedDate: Date }) => {
   const { data: profile } = useGetProfileQuery();

   // MOCK DATA
   const memberData = [
      {
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
         name: "Rahim",
         role: "Manager",
         avatar: "https://i.pravatar.cc/150?u=rahim",
         total: 4,
         breakfast: 1,
         lunch: 2,
         dinner: 1,
      },
      {
         name: "Ali",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=ali",
         total: 3,
         breakfast: 1,
         lunch: 1,
         dinner: 1,
      },
      {
         name: "Karim",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=karim",
         total: 2,
         breakfast: 1,
         lunch: 1,
         dinner: 0,
      },
      {
         name: "Sara",
         role: "Guest",
         avatar: "https://i.pravatar.cc/150?u=sara",
         total: 6,
         breakfast: 2,
         lunch: 2,
         dinner: 2,
      },
      {
         name: "Amina",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=amina",
         total: 3,
         breakfast: 0,
         lunch: 2,
         dinner: 1,
      },
      {
         name: "David",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=david",
         total: 1,
         breakfast: 0,
         lunch: 1,
         dinner: 0,
      },
      {
         name: "Lisa",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=lisa",
         total: 3,
         breakfast: 1,
         lunch: 1,
         dinner: 1,
      },
      {
         name: "Jake",
         role: "Member",
         avatar: "https://i.pravatar.cc/150?u=jake",
         total: 1,
         breakfast: 0,
         lunch: 1,
         dinner: 0,
      },
   ];

   const myData = memberData.find((m) => m.isMe) || memberData[0];
   const groupTotal = memberData.reduce((acc, m) => acc + m.total, 0);

   const sectionTitle = isToday(selectedDate)
      ? "Today's Meals"
      : `${format(selectedDate, "MMMM d")}, Meals`;

   return (
      <View className="px-6 space-y-6 pb-32">
         {/* Dynamic Section Header */}
         <View className="mb-2">
            {/* <Typography className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
               Overview
            </Typography> */}
            <Typography className="text-lg font-black text-on-surface">
               {sectionTitle}
            </Typography>
         </View>

         {/* Summary Hero Row */}
         <QuickMealsViewCard
            myTotalMeals={myData.total}
            groupTotalMeals={groupTotal}
         />

         {/* Meal Schedule Shortcut */}
         {/* <TouchableOpacity
            className="flex-row items-center justify-between bg-surface-container/90 px-6 py-4 rounded-[24px] border border-outline/5 active:bg-surface-container/50"
            onPress={() => {}}
         >
            <View className="flex-row items-center gap-4">
               <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                  <MaterialCommunityIcons
                     name="calendar-clock"
                     size={20}
                     color="#F59E0B"
                  />
               </View>
               <View>
                  <Typography className="text-sm font-bold text-on-surface">
                     Set Meal Schedule
                  </Typography>
                  <Typography className="text-[10px] text-on-surface opacity-60">
                     Personalize your weekly routines
                  </Typography>
               </View>
            </View>
            <MaterialCommunityIcons
               name="chevron-right"
               size={20}
               className="text-on-surface"
            />
         </TouchableOpacity> */}

         {/* Unified Member List */}
         <View>
            <View className="flex-row justify-between items-center mb-5 mt-4">
               <Typography className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Member Participation
               </Typography>
               <Typography className="text-[10px] font-bold text-on-surface-variant/40 uppercase">
                  Total: {memberData.length}
               </Typography>
            </View>
            {[...memberData]
               .sort((a, b) => (a.isMe === b.isMe ? 0 : a.isMe ? -1 : 1))
               .map((member, idx) => (
                  <MemberSummaryItem
                     key={idx}
                     {...member}
                  />
               ))}
         </View>
      </View>
   );
};
