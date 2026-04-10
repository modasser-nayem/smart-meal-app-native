import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Container } from "@/components/ui/Container";
import { format, setMonth, isValid } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Modular Components
import { MealsHeader } from "@/components/screens/meals/MealsHeader";
import { ViewToggle } from "@/components/screens/meals/ViewToggle";
import { DateStrip } from "@/components/screens/meals/DateStrip";
import { DailyMeals } from "@/components/screens/meals/DailyMeals";
import { MonthlyAnalytics } from "@/components/screens/meals/MonthlyAnalytics";
import { MonthYearPicker } from "@/components/screens/meals/MonthYearPicker";
import { MealFAB } from "@/components/screens/meals/MealFAB";
import { Typography } from "@/components/ui/Typography";

export default function MealsScreen() {
   const [viewType, setViewType] = useState<"daily" | "monthly">("daily");
   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
   const [isPickerVisible, setIsPickerVisible] = useState(false);

   const safeDate = isValid(selectedDate) ? selectedDate : new Date();

   const handleDateChange = (date: Date) => {
      const freshDate = new Date(date);
      setSelectedDate(isValid(freshDate) ? freshDate : new Date());
      setIsPickerVisible(false);
   };

   const handleMonthChange = (monthIndex: number) => {
      setSelectedDate(prev => {
         const newDate = setMonth(new Date(prev), monthIndex);
         return isValid(newDate) ? newDate : new Date();
      });
   };

   return (
      <View className="flex-1 bg-background">
         <Container
            scrollable
            className="flex-1"
         >
            {/* Clean Centered Header */}
            <MealsHeader
               title={
                  viewType === "daily"
                     ? format(safeDate, "MMMM d, yyyy")
                     : format(safeDate, "MMMM yyyy")
               }
               subtitle={
                  viewType === "daily"
                     ? "Daily Participation"
                     : "Monthly Group Ledger"
               }
            />

            {/* View Switcher */}
            <ViewToggle
               activeTab={viewType}
               onTabChange={setViewType}
            />

            {/* Dynamic Content */}
            <View className="flex-1">
               {viewType === "daily" ? (
                  <View className="flex-1">
                     <DateStrip
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        onCalendarPress={() => setIsPickerVisible(true)}
                     />
                     <DailyMeals selectedDate={selectedDate} />
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

            {/* Shared Month/Year Picker */}
            <MonthYearPicker
               visible={isPickerVisible}
               onClose={() => setIsPickerVisible(false)}
               selectedDate={selectedDate}
               onSelect={handleDateChange}
            />
         </Container>

         {/* Log Meal FAB - Theme Aligned */}
         <MealFAB onPress={() => {}} />
      </View>
   );
}
