import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { useGetProfileQuery } from "@/api/userApi";
import { format, isToday, isValid } from "date-fns";
import QuickMealsViewCard from "./QuickMealsViewCard";
import { MealBottomAction } from "./MealBottomAction";
import MembersMealParticipation from "./MembersMealParticipation";

export const DailyMeals = ({ selectedDate }: { selectedDate: Date }) => {
   const { data: profile } = useGetProfileQuery();

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

   const myData = memberData.find((m) => m.isMe) || memberData[0];
   const groupTotal = memberData.reduce((acc, m) => acc + m.total, 0);

   const safeDate = isValid(selectedDate) ? selectedDate : new Date();
   const sectionTitle = isToday(safeDate)
      ? "Today's Meals"
      : `${format(safeDate, "MMMM d")}, Meals`;

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

         {/* Unified Member List */}
         <MembersMealParticipation members={memberData} />

         <MealBottomAction />
      </View>
   );
};
