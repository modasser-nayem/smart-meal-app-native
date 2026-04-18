import { useState } from "react";
import { View } from "react-native";
import { Container } from "@/components/ui/Container";
import { useRouter } from "expo-router";
import { useGetProfileQuery } from "@/api/userApi";

import { HomeHeader } from "@/components/screens/home/HomeHeader";
import { ActiveGroupCard } from "@/components/screens/home/ActiveGroupCard";
import { TodaySnapshot } from "@/components/screens/home/TodaySnapshot";
import { BalanceCard } from "@/components/screens/home/BalanceCard";
import { QuickActions } from "@/components/screens/home/QuickActions";
import { RecentActivity } from "@/components/screens/home/RecentActivity";
import { HomeFAB } from "@/components/screens/home/HomeFAB";
import { NoticesPanelSheet } from "@/components/screens/home/NoticesPanelSheet";
import { LogMealSheet, LogMealMember } from "@/components/screens/meals/LogMealSheet";
import { Notice } from "@/components/screens/group/GroupNoticeSection";

// Mock notices — replace with real API (shared with group tab)
const MOCK_NOTICES: Notice[] = [
   {
      id: "n1",
      title: "🛒 Grocery Day Reminder",
      body: "Everyone please contribute ৳800 for groceries before 6 PM today. Karim will collect from each room.",
      timeAgo: "2h ago",
      pinColor: "warning",
      postedBy: "Ali Nayem",
      isPinned: true,
   },
   {
      id: "n2",
      title: "📊 March Billing Closed",
      body: "March billing is now finalized. Total: ৳42,560. Please settle any outstanding dues within 3 days.",
      timeAgo: "Yesterday",
      pinColor: "info",
      postedBy: "Ali Nayem",
   },
   {
      id: "n3",
      title: "✅ Internet Bill Paid",
      body: "This month's internet bill of ৳1,000 has been paid.",
      timeAgo: "2 days ago",
      pinColor: "success",
      postedBy: "Karim Hossain",
   },
];

// Mock members — replace with real API
const MOCK_MEMBERS: LogMealMember[] = [
   { id: "m1", name: "Ali Nayem", initials: "AN", avatar: "https://i.pravatar.cc/150?u=ali" },
   { id: "m2", name: "Karim Hossain", initials: "KH", avatar: "https://i.pravatar.cc/150?u=karim" },
   { id: "m3", name: "Rahim Uddin", initials: "RU", avatar: "https://i.pravatar.cc/150?u=rahim" },
];

export default function HomeScreen() {
   const router = useRouter();
   const { data: profile } = useGetProfileQuery();
   const [logSheetVisible, setLogSheetVisible] = useState(false);
   const [noticesPanelVisible, setNoticesPanelVisible] = useState(false);

   return (
      <View className="flex-1 bg-background">
         <HomeHeader
            username={profile?.username || "Nayem"}
            photoUrl={profile?.photoUrl}
            notificationCount={3}
            noticeCount={MOCK_NOTICES.length}
            onProfilePress={() => router.push("/(tabs)/profile")}
            onNotificationPress={() => {}}
            onNoticePress={() => setNoticesPanelVisible(true)}
         />

         <Container scrollable padding={false} className="bg-background">
            <View className="px-5 pt-4 pb-32 gap-6">
               {/* Active Group */}
               <ActiveGroupCard
                  groupName="Bachelor House"
                  memberCount={12}
                  month="April 2026"
                  userRole="Owner 👑"
                  isMonthOpen
                  onSwitchGroup={() => router.push("/(tabs)/profile")}
                  onGoToGroup={() => router.push("/(tabs)/group")}
               />

               {/* Noticeboard moved to header icon — removed from scroll */}

               {/* Today's Snapshot */}
               <TodaySnapshot onViewDetails={() => router.push("/(tabs)/meals")} />

               {/* Personal Balance */}
               <BalanceCard
                  cost="৳1,280"
                  paid="৳1,500"
                  balance="220"
                  isSurplus
                  mealCount={28}
                  mealRate="৳32/meal"
               />

               {/* Quick Actions */}
               <QuickActions
                  onLogMeal={() => setLogSheetVisible(true)}
                  onAddExpense={() => router.push("/(tabs)/expense")}
                  onViewExpenses={() => router.push("/(tabs)/expense")}
                  onMembers={() => router.push("/(tabs)/group")}
               />

               {/* Recent Activity */}
               <RecentActivity onViewAll={() => {}} />
            </View>
         </Container>

         {/* FAB — quick log meal */}
         <HomeFAB onPress={() => setLogSheetVisible(true)} />

         {/* Notices panel — opened from header bullhorn icon */}
         <NoticesPanelSheet
            visible={noticesPanelVisible}
            onClose={() => setNoticesPanelVisible(false)}
            notices={MOCK_NOTICES}
            onSeeAll={() => router.push("/(tabs)/group")}
         />

         {/* Log Meal Sheet */}
         <LogMealSheet
            visible={logSheetVisible}
            selectedDate={new Date()}
            onClose={() => setLogSheetVisible(false)}
            onSubmit={(data) => {
               console.log("Log meal from home:", data);
            }}
            members={MOCK_MEMBERS}
            userRole="Owner"
         />
      </View>
   );
}
