import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MEAL_TYPES = [
   { id: "brk", label: "Brk", icon: "weather-sunny" },
   { id: "lch", label: "Lch", icon: "silverware-fork-knife" },
   { id: "dnr", label: "Dnr", icon: "weather-night" },
   { id: "snk", label: "Snk", icon: "cookie" },
];

export default function MealsScreen() {
   return (
      <Container scrollable className="bg-background pt-12 pb-32">
         {/* TopAppBar */}
         <View className="flex-row justify-between items-center px-4 h-16 w-full">
            <View className="flex-row items-center gap-3">
               <MaterialCommunityIcons name="menu" size={24} color="#F59E0B" />
               <View>
                  <Typography className="text-primary text-lg font-bold">Meal Schedule</Typography>
                  <Typography className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">April 2026</Typography>
               </View>
            </View>
            <TouchableOpacity className="px-4 py-1.5 rounded-full border border-primary/40 active:bg-surface-container">
               <Typography className="text-primary text-xs font-semibold">Apply to Month</Typography>
            </TouchableOpacity>
         </View>

         <View className="px-4 mt-4 mb-6">
            <Typography variant="h2" className="text-2xl font-extrabold text-white">My Weekly Schedule</Typography>
            <Typography className="text-on-surface-variant text-sm mt-1">Configure your recurring meal preferences.</Typography>
         </View>

         {/* Member Selector */}
         <View className="px-4 mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
               <View className="px-4 py-2 rounded-full bg-primary-container mr-4 shadow-lg shadow-orange-500/10">
                  <Typography className="text-on-primary-container font-semibold text-sm">All Members</Typography>
               </View>
               <View className="flex-row -space-x-2 mr-4">
                  <View className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-high items-center justify-center">
                     <Typography className="text-primary text-xs font-bold">JD</Typography>
                  </View>
                  <Image 
                     source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAekOuYjcq4Otqx2r3uWv33LCRNbyva4O9ScZSJFZr8scJXNfSjUxQ78hBqaMlOD7Ssx7c6GLoak-W5sGCu_-Q6xXev15Z8qGW4oIq2XM5U4aML2s4QdHjQt8ZRE0Yuw7Q79wzsOzQ4JGo9x8AAzrbCKeflKcRy0HFEZ0QDlJDw-zOGYf_LwmZaiLtgdE6omJOvwGGKJgAD7SQQOwfnl-suhTUKSFNYDBipROIsiOXOeCTnXRmGJTBrFvJ7ZzpUxnz0tekUYKr5V0w" }}
                     className="w-10 h-10 rounded-full border-2 border-background"
                  />
                  <View className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-high items-center justify-center">
                     <Typography className="text-primary text-xs font-bold">MS</Typography>
                  </View>
               </View>
               <TouchableOpacity className="w-10 h-10 rounded-full border-2 border-dashed border-outline-variant items-center justify-center">
                  <MaterialCommunityIcons name="plus" size={16} color="#94A3B8" />
               </TouchableOpacity>
            </ScrollView>
         </View>

         {/* Schedule Grid */}
         <View className="mx-4 bg-surface-container rounded-3xl p-4 shadow-xl border border-white/5">
            <View className="flex-row mb-4">
               <View className="w-[12%]" />
               {DAYS.map((day, i) => (
                  <Typography key={i} className="flex-1 text-center text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                     {day}
                  </Typography>
               ))}
            </View>

            {MEAL_TYPES.map((type, i) => (
               <View key={type.id} className="flex-row items-center mb-4">
                  <View className="w-[12%] items-center">
                     <MaterialCommunityIcons name={type.icon as any} size={18} color="rgba(245, 158, 11, 0.6)" />
                     <Typography className="text-[8px] font-bold uppercase mt-1 opacity-40">{type.label}</Typography>
                  </View>
                  {DAYS.map((_, dayIdx) => {
                     const isSelected = (i + dayIdx) % 3 === 0; // Mock data
                     const count = (i + dayIdx) % 5;
                     return (
                        <TouchableOpacity 
                           key={dayIdx}
                           className={cn(
                              "flex-1 aspect-square mx-1 rounded-2xl items-center justify-center active:scale-95",
                              isSelected ? "bg-primary-container shadow-lg" : "border-2 border-outline-variant/30"
                           )}
                        >
                           {isSelected ? (
                              <>
                                 <MaterialCommunityIcons name="check" size={20} color="white" />
                                 {count > 0 && (
                                    <View className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full items-center justify-center shadow-md">
                                       <Typography className="text-primary-container text-[10px] font-black">{count}</Typography>
                                    </View>
                                 )}
                              </>
                           ) : (
                              <MaterialCommunityIcons name="minus" size={20} color="#94A3B8" className="opacity-40" />
                           )}
                        </TouchableOpacity>
                     );
                  })}
               </View>
            ))}

            {/* Legend */}
            <View className="mt-4 pt-4 border-t border-outline-variant/10 flex-row justify-center gap-6">
               <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-primary-container" />
                  <Typography className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">Scheduled</Typography>
               </View>
               <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-surface-container-high border border-outline-variant/30" />
                  <Typography className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">Not Scheduled</Typography>
               </View>
            </View>
         </View>

         {/* Bottom Actions */}
         <View className="px-4 mt-8 space-y-4">
            <View className="bg-surface-container-high/40 border border-white/5 rounded-2xl p-4 flex-row items-center justify-between">
               <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="calendar-today" size={20} color="#F59E0B" />
                  <Typography className="text-sm font-medium text-on-surface">Apply schedule for today</Typography>
               </View>
               <TouchableOpacity className="bg-surface-container-highest px-3 py-1.5 rounded-lg active:scale-95">
                  <Typography className="text-[10px] font-bold uppercase tracking-widest text-primary">Apply</Typography>
               </TouchableOpacity>
            </View>
            <TouchableOpacity className="w-full py-4 rounded-2xl bg-primary items-center shadow-xl shadow-orange-500/20 active:scale-95">
               <Typography className="text-on-primary font-bold text-lg">Apply for remaining days</Typography>
            </TouchableOpacity>
         </View>
      </Container>
   );
}
