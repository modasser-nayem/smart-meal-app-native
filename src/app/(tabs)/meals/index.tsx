import { useState } from "react";
import { View } from "react-native";
import { Container } from "@/components/ui/Container";
import { format, setMonth, isValid } from "date-fns";

import { MealsHeader } from "@/components/screens/meals/MealsHeader";
import { ViewToggle } from "@/components/screens/meals/ViewToggle";
import { DateStrip } from "@/components/screens/meals/DateStrip";
import { DailyMeals } from "@/components/screens/meals/DailyMeals";
import { MonthlyAnalytics } from "@/components/screens/meals/MonthlyAnalytics";
import { MonthYearPicker } from "@/components/screens/meals/MonthYearPicker";
import { MealFAB } from "@/components/screens/meals/MealFAB";
import { LogMealSheet, LogMealMember } from "@/components/screens/meals/LogMealSheet";

// Mock members for admin log — replace with real API data
const MOCK_MEMBERS: LogMealMember[] = [
   { id: "m1", name: "Ali Nayem", initials: "AN", avatar: "https://i.pravatar.cc/150?u=ali" },
   { id: "m2", name: "Karim Hossain", initials: "KH", avatar: "https://i.pravatar.cc/150?u=karim" },
   { id: "m3", name: "Rahim Uddin", initials: "RU", avatar: "https://i.pravatar.cc/150?u=rahim" },
   { id: "m4", name: "Sara Ahmed", initials: "SA", avatar: "https://i.pravatar.cc/150?u=sara" },
];
const USER_ROLE: "Owner" | "Manager" | "Member" = "Owner"; // replace with real role from auth

export default function MealsScreen() {
   const [viewType, setViewType] = useState<"daily" | "monthly">("daily");
   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
   const [isPickerVisible, setIsPickerVisible] = useState(false);
   const [isLogSheetVisible, setIsLogSheetVisible] = useState(false);

   const safeDate = isValid(selectedDate) ? selectedDate : new Date();

   const handleDateChange = (date: Date) => {
      const freshDate = new Date(date);
      setSelectedDate(isValid(freshDate) ? freshDate : new Date());
      setIsPickerVisible(false);
   };

   const handleMonthChange = (monthIndex: number) => {
      setSelectedDate((prev) => {
         const newDate = setMonth(new Date(prev), monthIndex);
         return isValid(newDate) ? newDate : new Date();
      });
   };

   const handleLogMeal = (data: { date: string; meals: string[]; note?: string }) => {
      // TODO: wire to useAddMealMutation
      console.log("Log meal:", data);
   };

   return (
      <View className="flex-1 bg-background">
         <Container scrollable className="flex-1">
            {/* Header */}
            <MealsHeader
               title={
                  viewType === "daily"
                     ? format(safeDate, "MMMM d, yyyy")
                     : format(safeDate, "MMMM yyyy")
               }
               subtitle={viewType === "daily" ? "Daily Participation" : "Monthly Group Ledger"}
            />

            {/* Daily / Monthly toggle */}
            <ViewToggle activeTab={viewType} onTabChange={setViewType} />

            {/* Content */}
            <View className="flex-1">
               {viewType === "daily" ? (
                  <View className="flex-1">
                     <DateStrip
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        onCalendarPress={() => setIsPickerVisible(true)}
                     />
                     <DailyMeals
                        selectedDate={selectedDate}
                        onLogMeal={() => setIsLogSheetVisible(true)}
                     />
                  </View>
               ) : (
                  <View className="flex-1">
                     <MonthlyAnalytics
                        selectedMonth={selectedDate}
                        onMonthChange={handleMonthChange}
                        onYearPress={() => setIsPickerVisible(true)}
                     />
                  </View>
               )}
            </View>

            <MonthYearPicker
               visible={isPickerVisible}
               onClose={() => setIsPickerVisible(false)}
               selectedDate={selectedDate}
               onSelect={handleDateChange}
            />
         </Container>

         {/* FAB */}
         <MealFAB onPress={() => setIsLogSheetVisible(true)} />

         {/* Log Meal Sheet */}
         <LogMealSheet
            visible={isLogSheetVisible}
            selectedDate={safeDate}
            onClose={() => setIsLogSheetVisible(false)}
            onSubmit={handleLogMeal}
            onAdminSubmit={(data) => {
               // TODO: wire to useAdminLogMealMutation
               console.log("Admin log meal:", data);
            }}
            members={MOCK_MEMBERS}
            userRole={USER_ROLE}
         />
      </View>
   );
}
