import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetExpensesQuery } from "@/api/expenseApi";
import { cn } from "@/lib/utils";

const CATEGORIES = [
   { label: "All", icon: "all-inclusive" },
   { label: "Food", icon: "food-variant" },
   { label: "Grocery", icon: "basket-outline" },
   { label: "Bazar", icon: "shopping-outline" },
   { label: "Other", icon: "dots-horizontal-circle-outline" },
];

export default function ExpenseScreen() {
   const [activeCategory, setActiveCategory] = useState("All");
   const { data: expenses, isLoading } = useGetExpensesQuery();

   return (
      <Container
         scrollable
         className="bg-background pt-12 pb-32"
      >
         {/* Header */}
         <View className="px-6 flex-row justify-between items-end mb-8">
            <View>
               <Typography className="text-secondary text-[10px] uppercase font-bold tracking-widest mb-1 opacity-60">
                  Financials
               </Typography>
               <Typography className="text-on-surface font-semibold text-lg">
                  Transaction History
               </Typography>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-surface-container-high rounded-full items-center justify-center">
               <MaterialCommunityIcons
                  name="filter-variant"
                  size={24}
                  color="#F59E0B"
               />
            </TouchableOpacity>
         </View>

         {/* Summary Stats */}
         <View className="px-6 mb-8">
            <Card className="bg-surface-container-high rounded-3xl p-6 border-b-4 border-secondary shadow-xl">
               <View className="flex-row justify-between items-center mb-6">
                  <View>
                     <Typography className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1">
                        Total Group Cost
                     </Typography>
                     <Typography className="text-3xl font-black text-white">
                        ৳14,580
                     </Typography>
                  </View>
                  <View className="bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
                     <Typography className="text-secondary text-[10px] font-bold uppercase tracking-tighter">
                        Budget Goal: ৳20K
                     </Typography>
                  </View>
               </View>

               <View className="h-2 w-full bg-surface-container rounded-full mb-6 overflow-hidden">
                  <View className="h-full bg-secondary w-[72%] rounded-full shadow-sm" />
               </View>

               <View className="flex-row justify-between items-center pt-6 border-t border-outline-variant/10">
                  <View>
                     <Typography className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1">
                        My Paid
                     </Typography>
                     <Typography className="text-xl font-bold text-tertiary">
                        ৳4,250
                     </Typography>
                  </View>
                  <View className="items-end">
                     <Typography className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1">
                        Due Amount
                     </Typography>
                     <Typography className="text-xl font-bold text-error">
                        ৳1,500
                     </Typography>
                  </View>
               </View>
            </Card>
         </View>

         {/* Categories */}
         <View className="mb-6">
            <ScrollView
               horizontal
               showsHorizontalScrollIndicator={false}
               className="px-6 space-x-3"
            >
               {CATEGORIES.map((cat, i) => (
                  <TouchableOpacity
                     key={i}
                     onPress={() => setActiveCategory(cat.label)}
                     className={cn(
                        "px-6 py-3 rounded-2xl flex-row items-center gap-2 border mr-3",
                        activeCategory === cat.label
                           ? "bg-primary border-primary"
                           : "bg-surface-container border-outline-variant/10",
                     )}
                  >
                     <MaterialCommunityIcons
                        name={cat.icon as any}
                        size={16}
                        color={
                           activeCategory === cat.label ? "#0F172A" : "#94A3B8"
                        }
                     />
                     <Typography
                        className={cn(
                           "font-bold text-sm",
                           activeCategory === cat.label
                              ? "text-on-primary"
                              : "text-on-surface",
                        )}
                     >
                        {cat.label}
                     </Typography>
                  </TouchableOpacity>
               ))}
            </ScrollView>
         </View>

         {/* Expense List */}
         <View className="px-6">
            <View className="flex-row items-center justify-between mb-6">
               <Typography
                  variant="h2"
                  className="text-xl font-bold text-white"
               >
                  Recent Transactions
               </Typography>
               <MaterialCommunityIcons
                  name="filter-variant"
                  size={24}
                  color="#F59E0B"
               />
            </View>

            <View className="space-y-4">
               {[
                  {
                     title: "Bazar - Monthly Groceries",
                     amount: "৳2,850",
                     payer: "Rahim",
                     date: "Today, 10:45 AM",
                     type: "Grocery",
                     icon: "cart-variant",
                     color: "bg-orange-500/10",
                     iconColor: "#FB923C",
                  },
                  {
                     title: "Chicken & Eggs",
                     amount: "৳850",
                     payer: "Karim",
                     date: "Yesterday",
                     type: "Food",
                     icon: "food-apple-outline",
                     color: "bg-red-500/10",
                     iconColor: "#F87171",
                  },
                  {
                     title: "Internet Bill",
                     amount: "৳1,000",
                     payer: "Me",
                     date: "April 02",
                     type: "Other",
                     icon: "wifi",
                     color: "bg-blue-500/10",
                     iconColor: "#60A5FA",
                  },
                  {
                     title: "Rice (25KG Bag)",
                     amount: "৳1,650",
                     payer: "Jabed",
                     date: "April 01",
                     type: "Grocery",
                     icon: "chart-bubble",
                     color: "bg-emerald-500/10",
                     iconColor: "#34D399",
                  },
               ].map((item, i) => (
                  <Card
                     key={i}
                     className="bg-surface-container rounded-2xl p-4 flex-row items-center gap-4 border border-white/5 active:bg-surface-container-high transition-all mb-4"
                  >
                     <View
                        className={cn(
                           "w-14 h-14 rounded-2xl items-center justify-center",
                           item.color,
                        )}
                     >
                        <MaterialCommunityIcons
                           name={item.icon as any}
                           size={28}
                           color={item.iconColor}
                        />
                     </View>
                     <View className="flex-1">
                        <Typography className="text-white font-bold text-base">
                           {item.title}
                        </Typography>
                        <View className="flex-row items-center gap-2 mt-1">
                           <Typography className="text-on-surface-variant text-[10px] font-bold uppercase">
                              {item.payer}
                           </Typography>
                           <Typography className="text-outline-variant">
                              •
                           </Typography>
                           <Typography className="text-on-surface-variant text-[10px] uppercase font-medium">
                              {item.date}
                           </Typography>
                        </View>
                     </View>
                     <View className="items-end">
                        <Typography className="text-white font-bold text-lg">
                           {item.amount}
                        </Typography>
                        <View className="px-2 py-0.5 rounded-md bg-surface-container-highest mt-1">
                           <Typography className="text-[8px] font-black uppercase text-outline tracking-tighter">
                              {item.type}
                           </Typography>
                        </View>
                     </View>
                  </Card>
               ))}
            </View>
         </View>
      </Container>
   );
}
