import { View } from "react-native";
import { useGetProfileQuery } from "@/api/userApi";
import QuickMealsViewCard from "./QuickMealsViewCard";
import MembersMealParticipation from "./MembersMealParticipation";

export const DailyMeals = ({
   selectedDate,
   onLogMeal,
}: {
   selectedDate: Date;
   onLogMeal?: () => void;
}) => {
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

   return (
      <View className="px-6 pb-32 gap-5">
         <QuickMealsViewCard
            myTotalMeals={myData.total}
            groupTotalMeals={groupTotal}
            onAddMeal={onLogMeal}
         />
         <MembersMealParticipation members={memberData} />
      </View>
   );
};
