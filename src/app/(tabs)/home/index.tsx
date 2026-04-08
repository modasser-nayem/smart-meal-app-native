import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetProfileQuery } from "@/api/userApi";
import { useGetMealsQuery } from "@/api/mealApi";
import { cn } from "@/lib/utils";

export default function HomeScreen() {
   const router = useRouter();
   const { data: profile } = useGetProfileQuery();
   const { data: meals } = useGetMealsQuery();

   return (
      <Container scrollable className="bg-background pt-12">
         {/* TopAppBar */}
         <View className="flex-row items-center justify-between px-6 py-4">
            <View>
               <Typography className="text-secondary text-xs uppercase tracking-wider font-medium opacity-60">
                  Good Morning 👋
               </Typography>
               <Typography variant="h2" className="text-2xl font-bold bg-primary text-transparent bg-clip-text">
                  {profile?.username || "Nayem"}
               </Typography>
            </View>
            <View className="flex-row items-center gap-4">
               <TouchableOpacity className="relative active:scale-95">
                  <MaterialCommunityIcons name="bell-outline" size={26} color="#94A3B8" />
                  <View className="absolute -top-1 -right-1 bg-primary-container w-4 h-4 rounded-full border-2 border-surface-container-low items-center justify-center">
                     <Typography className="text-on-primary-container text-[8px] font-bold">3</Typography>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
                  <View className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
                     <Image 
                        source={{ uri: profile?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3jdD-poSuSANiPR7VgxC9B5ccrozavF_CsDqU_hz9pgdLErGMIjcY7oU1_wM2iqXC14693hLM0pu_ieHOtK9G4pzPT1ZaDeK8N_5RdShmxU2AhBcJGr7VCQWqI-HLJYLTAl9hl6fUyLR8PcgLpOLisTYV4_i1TcX87m3yjXGNCMN7ZIT0jeSRA6JTpZpJCvC66y6yYX98Vwgc9-TQw_MePrtLN8p-c3Lf7WWIoq9Iv59PBV_AjExIUSMhn7VW29vPgNnRtNfxSA" }}
                        className="w-full h-full"
                     />
                  </View>
               </TouchableOpacity>
            </View>
         </View>

         <View className="px-6 space-y-6">
            {/* Active Group Card */}
            <Card className="bg-surface-container rounded-3xl p-6 border-t-4 border-primary-container overflow-hidden">
               <View className="flex-row justify-between items-start mb-4">
                  <View className="space-y-1">
                     <Typography variant="h3" className="text-on-surface text-xl">Bachelor House 🏠</Typography>
                     <View className="flex-row items-center gap-2">
                        <MaterialCommunityIcons name="account-group" size={14} color="#94A3B8" />
                        <Typography className="text-on-surface-variant text-xs">12 members</Typography>
                        <Typography className="text-outline-variant">•</Typography>
                        <MaterialCommunityIcons name="calendar" size={14} color="#94A3B8" />
                        <Typography className="text-on-surface-variant text-xs">April 2026</Typography>
                     </View>
                  </View>
                  <TouchableOpacity>
                     <Typography className="text-primary font-semibold text-xs">Switch</Typography>
                  </TouchableOpacity>
               </View>
               <View className="flex-row items-center justify-between mt-4">
                  <View className="flex-row items-center gap-2 bg-surface-container-highest/50 px-3 py-2 rounded-xl">
                     <Typography className="text-xs font-mono text-on-surface-variant">XY12Z3</Typography>
                     <MaterialCommunityIcons name="content-copy" size={16} color="#F59E0B" />
                  </View>
                  <View className="bg-primary/10 px-3 py-1.5 rounded-full">
                     <Typography className="text-primary text-[10px] font-bold uppercase">Owner 👑</Typography>
                  </View>
               </View>
            </Card>

            {/* Today's Snapshot */}
            <View>
               <View className="flex-row items-center justify-between mb-4">
                  <Typography className="text-on-surface font-semibold text-lg">Today · April 5</Typography>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
               </View>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-4">
                  <View className="w-36 bg-primary-container p-4 rounded-2xl items-center mr-3 shadow-lg shadow-orange-500/20">
                     <Typography className="text-2xl mb-1 text-on-primary-container">🌅</Typography>
                     <Typography className="text-on-primary-container font-bold text-sm">Breakfast</Typography>
                     <Typography className="text-on-primary-container/80 text-[10px] font-medium">8/12 joined</Typography>
                  </View>
                  <View className="w-36 bg-surface-container-high border border-primary/20 p-4 rounded-2xl items-center mr-3">
                     <Typography className="text-2xl mb-1">🍱</Typography>
                     <Typography className="text-primary font-bold text-sm">Lunch</Typography>
                     <Typography className="text-on-surface-variant text-[10px] font-medium">10/12 joined</Typography>
                  </View>
                  <View className="w-36 bg-surface-container-low opacity-60 p-4 rounded-2xl items-center">
                     <Typography className="text-2xl mb-1">🍽️</Typography>
                     <Typography className="text-on-surface-variant font-bold text-sm">Dinner</Typography>
                     <Typography className="text-on-surface-variant/60 text-[10px] font-medium">0/12 joined</Typography>
                  </View>
               </ScrollView>
            </View>

            {/* Balance Card */}
            <Card className="bg-surface-container rounded-3xl p-6">
               <View className="flex-row justify-between mb-6">
                  <View className="space-y-1">
                     <Typography className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">My Cost</Typography>
                     <View className="flex-row items-baseline gap-1">
                        <Typography className="text-2xl font-bold text-primary">৳1,280</Typography>
                        <Typography className="text-[10px] text-on-surface-variant italic">April</Typography>
                     </View>
                  </View>
                  <View className="space-y-1 items-end">
                     <Typography className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">I Paid</Typography>
                     <Typography className="text-2xl font-bold text-tertiary">৳1,500</Typography>
                  </View>
               </View>
               
               <View className="items-center py-4 border-y border-outline-variant/10">
                  <View className="flex-row items-center gap-2">
                     <MaterialCommunityIcons name="trending-up" size={28} color="#22C55E" />
                     <Typography className="text-3xl font-extrabold text-tertiary">+৳220</Typography>
                  </View>
                  <Typography className="text-[10px] text-on-surface-variant mt-2 uppercase font-bold tracking-tight">Surplus Balance</Typography>
               </View>

               <View className="flex-row justify-center gap-4 mt-4">
                  <View className="flex-row items-center gap-1">
                     <MaterialCommunityIcons name="food-fork-drink" size={12} color="#94A3B8" />
                     <Typography className="text-[10px] font-bold text-on-surface-variant/70 uppercase">28 meals</Typography>
                  </View>
                  <View className="w-1 h-1 bg-outline-variant/30 rounded-full my-auto" />
                  <View className="flex-row items-center gap-1">
                     <MaterialCommunityIcons name="cash" size={12} color="#94A3B8" />
                     <Typography className="text-[10px] font-bold text-on-surface-variant/70 uppercase">Rate: ৳32</Typography>
                  </View>
               </View>
            </Card>

            {/* Quick Actions */}
            <View className="flex-row flex-wrap justify-between gap-y-4">
               {[
                  { label: "Log Meal", icon: "plus", color: "bg-primary/10", hex: "#F59E0B", route: "/(tabs)/meals" },
                  { label: "Add Expense", icon: "cash-plus", color: "bg-secondary-container/10", hex: "#3B82F6", route: "/(tabs)/expense" },
                  { label: "View Summary", icon: "chart-bar", color: "bg-purple-500/10", hex: "#A855F7", route: "/(tabs)/expense" },
                  { label: "Members", icon: "account-group", color: "bg-tertiary-container/10", hex: "#22C55E", route: "/(tabs)/group" },
               ].map((action, i) => (
                  <TouchableOpacity 
                     key={i} 
                     onPress={() => router.push(action.route as any)}
                     className="w-[48%] bg-surface-container-high p-4 rounded-2xl flex-col gap-3 active:scale-95"
                  >
                     <View className={cn("w-10 h-10 rounded-xl items-center justify-center", action.color)}>
                        <MaterialCommunityIcons name={action.icon as any} size={24} color={action.hex} />
                     </View>
                     <Typography className="font-bold text-sm text-white">{action.label}</Typography>
                  </TouchableOpacity>
               ))}
            </View>

            {/* Recent Activity */}
            <View className="pb-12">
               <View className="flex-row items-center justify-between mb-4">
                  <Typography className="text-on-surface font-semibold text-lg">Recent Activity</Typography>
                  <Typography className="text-[10px] font-bold text-primary uppercase tracking-widest">View All</Typography>
               </View>
               <View className="space-y-3">
                  {[
                     { name: "Rahim", action: "logged Dinner", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5NJNLVaBEsRdfdndSTECeIiJyvpxb9o8JJLWLD6j65_ZqqGPuNPyHRlpzoA2peyOIwWuMQ-arUw-6ALc7HzN6PNGGHSkvYQPZH9DPJQYKsZBL45wau6GkK17mSScjEp_3IO_u-joF51SoapGo-eoTD0JMXtGMLpeOLCpEjFFFdw_k4WzocGx0_Utqs9MagYCubWzpvyVFWrqZL1KG1q1ZqiFMXtWrBGSRvsaIiVxGrqzA2GC5mgbnJqBbOqKG2bz6eZmDqeNH8Oo", time: "2h ago", highlight: "Dinner" },
                     { name: "Karim", action: "added expense", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAugdjCdQ-fMGmJ5g0Qc5CGhizfugdDwZdx80IiTz9mmfcPfBXA1dAr-MedMcABjlQk8MAJF1LvAVlqt9fhPtZktYhZI8ocBJPa_Edie1dLAfqb255oe2BMGrrisxGZ_2afnflzSV55r5tR_DsY8p_p0Rrg1BrQSbDuc_WkUtz4x6ws8loY-w9joT4kiXH6MuZYtDx_8J3ZOSWfK9JzbHbqdka4MpQvVhQZpO76eRxnXTXmtOwh_qvvurZeWIqmsI5oy69tU1qubq8", time: "Yesterday", highlight: "৳850" }
                  ].map((item, i) => (
                     <TouchableOpacity key={i} className="flex-row items-center gap-4 bg-surface-container-low p-4 rounded-2xl active:opacity-70">
                        <Image source={{ uri: item.icon }} className="w-10 h-10 rounded-full" />
                        <View className="flex-1">
                           <Typography className="text-sm text-on-surface font-medium">
                              <Typography className="font-bold">{item.name}</Typography> {item.action} <Typography className="text-primary font-bold">{item.highlight}</Typography>
                           </Typography>
                           <Typography className="text-[10px] text-on-surface-variant font-bold uppercase mt-1">{item.time}</Typography>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={16} color="#94A3B8" />
                     </TouchableOpacity>
                  ))}
               </View>
            </View>
         </View>
      </Container>
   );
}
