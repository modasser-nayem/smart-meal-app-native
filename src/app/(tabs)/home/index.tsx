import React from "react";
import { View } from "react-native";
import { Container } from "@/components/ui/Container";
import { useRouter } from "expo-router";
import { useGetProfileQuery } from "@/api/userApi";

// Modular Components
import { HomeHeader } from "@/components/screens/home/HomeHeader";
import { ActiveGroupCard } from "@/components/screens/home/ActiveGroupCard";
import { TodaySnapshot } from "@/components/screens/home/TodaySnapshot";
import { BalanceCard } from "@/components/screens/home/BalanceCard";
import { QuickActions } from "@/components/screens/home/QuickActions";
import { RecentActivity } from "@/components/screens/home/RecentActivity";
import { HomeFAB } from "@/components/screens/home/HomeFAB";

export default function HomeScreen() {
   const router = useRouter();
   const { data: profile } = useGetProfileQuery();

   return (
      <View className="flex-1 bg-background relative">
         <HomeHeader
            username={profile?.username || "Nayem"}
            photoUrl={profile?.photoUrl}
            notificationCount={3}
            onProfilePress={() => router.push("/(tabs)/profile")}
            onNotificationPress={() => {}}
         />

         <Container
            scrollable
            className="bg-background"
         >
            <View className="px-6 py-6 space-y-6 pb-32">
               {/* Active Group Context */}
               <ActiveGroupCard
                  groupName="Bachelor House 🏠"
                  memberCount={12}
                  month="April 2026"
                  inviteCode="XY12Z3"
                  userRole="Owner 👑"
                  onSwitchGroup={() => {}}
                  onCopyCode={() => {}}
               />

               {/* Today's Snapshot */}
               <TodaySnapshot />

               {/* Personal Financial Summary */}
               <BalanceCard
                  cost="৳1,280"
                  paid="৳1,500"
                  balance="220"
                  isSurplus={true}
                  mealCount={28}
                  mealRate="৳32/meal"
               />

               {/* Navigation Grid */}
               <QuickActions
                  onLogMeal={() => router.push("/(tabs)/meals")}
                  onAddExpense={() => router.push("/(tabs)/expense")}
                  onViewSummary={() => router.push("/(tabs)/expense")}
                  onMembers={() => router.push("/(tabs)/group")}
               />

               {/* Activity Feed */}
               <RecentActivity />
            </View>
         </Container>

         {/* Floating Quick Add */}
         <HomeFAB onPress={() => {}} />
      </View>
   );
}
