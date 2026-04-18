import React, { useState, useRef } from "react";
import {
   View,
   TouchableOpacity,
   FlatList,
   Dimensions,
   Animated,
   Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

const SLIDES = [
   {
      id: "1",
      title: "Track Daily Meals",
      description:
         "See who ate what, every day. No more guessing or missed entries.",
      actionLabel: "Continue",
   },
   {
      id: "2",
      title: "Share Expenses Fairly",
      description:
         "Automatic meal rate calculation. Everyone pays their fair share.",
      actionLabel: "Continue",
   },
   {
      id: "3",
      title: "Stay Transparent",
      description: "Know your balance anytime. Close the month and settle up.",
      actionLabel: "Get Started",
   },
];

const RenderArtwork = ({ id }: { id: string }) => {
   if (id === "1") {
      return (
         <View className="relative w-full aspect-square max-w-[320px] mb-6 items-center justify-center">
            <View className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-125" />
            <View className="w-full h-full rounded-[32px] overflow-hidden border border-outline/20 shadow-2xl relative">
               <Image
                  source={{
                     uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxqu09T6r-RPhBpmg41Xe_XbKtRGoP4uublq9ZnHvXppQa4QxpxEN5rxTHS6thmkmf_jQO4It-DqNOMNgjA3StBe6iACL-JwCFdVjxu-oII2vkuc85KPJFEW9u5-0X02AJyqvYPM6bh-t1veSDx5Bq8gQ7-zoEasxwMyeDJ_z6YC-2MROoqmE4MW1FahndqldtnWbzo_AyKOuj6UlrfM3QlaN4bEbswRRHkMRWu-m5kjv_9CMhyd5AWkc35lKTM1Cyur2QsBZxNdU",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
               />
               <View className="absolute inset-0 bg-background/20" />
            </View>
            <View className="absolute -bottom-4 -right-4 bg-surface/90 p-4 rounded-2xl border border-outline/10 shadow-xl flex-row items-center gap-3">
               <View className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <MaterialCommunityIcons
                     name="silverware-fork-knife"
                     size={16}
                     color={Colors.icon.primary}
                  />
               </View>
               <View>
                  <Typography className="text-[10px] text-secondary uppercase tracking-widest font-bold">
                     Today
                  </Typography>
                  <Typography className="text-sm font-semibold text-on-surface">
                     4 Meals Logged
                  </Typography>
               </View>
            </View>
         </View>
      );
   }

   if (id === "2") {
      return (
         <View className="relative w-full aspect-square max-w-[320px] mb-6 items-center justify-center">
            <View className="absolute inset-0 bg-surface-container rounded-full scale-90 opacity-20 blur-3xl" />
            <View className="relative w-64 h-64 bg-surface-container rounded-[40px] items-center justify-center shadow-2xl border border-outline/10 z-10">
               <View className="flex-row gap-8 mb-12">
                  <View className="w-16 h-16 rounded-full bg-surface items-center justify-center border-2 border-primary/10">
                     <MaterialCommunityIcons
                        name="account"
                        size={32}
                        color={Colors.icon.primary}
                     />
                  </View>
                  <View className="w-16 h-16 rounded-full bg-surface items-center justify-center border-2 border-primary/10">
                     <MaterialCommunityIcons
                        name="account"
                        size={32}
                        color={Colors.icon.primary}
                     />
                  </View>
               </View>
               <View
                  className="absolute w-full top-[53%] flex-row justify-center gap-6"
                  style={{ marginTop: -24 }}
               >
                  <View
                     className="w-12 h-12 rounded-full bg-primary shadow-lg items-center justify-center"
                     style={{ transform: [{ translateX: -12 }] }}
                  >
                     <MaterialCommunityIcons
                        name="cash-multiple"
                        size={24}
                        color={Colors.icon.onPrimary}
                     />
                  </View>
                  <View
                     className="w-12 h-12 rounded-full bg-primary shadow-lg items-center justify-center"
                     style={{ transform: [{ translateX: 12 }] }}
                  >
                     <MaterialCommunityIcons
                        name="cash-multiple"
                        size={24}
                        color={Colors.icon.onPrimary}
                     />
                  </View>
               </View>
               <View className="mt-8 px-6 py-2 rounded-full bg-surface border border-outline/20">
                  <Typography className="text-primary text-xs font-bold tracking-widest uppercase">
                     Fair Share Calculated
                  </Typography>
               </View>
            </View>
            <View className="absolute -left-4 top-1/4 w-24 h-32 bg-surface-container rounded-2xl -rotate-6 opacity-40 z-0" />
            <View className="absolute -right-4 bottom-1/4 w-24 h-32 bg-surface-container rounded-2xl rotate-12 opacity-40 z-0" />
         </View>
      );
   }

   if (id === "3") {
      return (
         <View className="relative w-full aspect-square max-w-[320px] mb-6 items-center justify-center mt-6">
            <View className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75" />
            <View className="relative z-10 w-full p-8 bg-surface-container rounded-[40px] shadow-xl border border-outline/10">
               <View className="flex-row items-end justify-center gap-4 mb-8">
                  <View className="items-center gap-2">
                     <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={48}
                        color={Colors.icon.subtle}
                     />
                     <View className="w-16 h-2 bg-surface rounded-full" />
                  </View>
                  <MaterialCommunityIcons
                     name="scale-balance"
                     size={56}
                     color={Colors.icon.primary}
                     className="mb-2"
                  />
                  <View className="items-center gap-2">
                     <MaterialCommunityIcons
                        name="cash-multiple"
                        size={48}
                        color={Colors.icon.success}
                     />
                     <View className="w-16 h-2 bg-surface rounded-full" />
                  </View>
               </View>
               <View className="flex-row gap-3 justify-center w-full">
                  <View className="flex-1 bg-surface p-3 rounded-xl border-l-4 border-error">
                     <Typography className="text-[10px] uppercase tracking-widest font-bold text-primary">
                        You Owe
                     </Typography>
                     <Typography className="font-bold text-on-surface text-base">
                        ৳124
                     </Typography>
                  </View>
                  <View className="flex-1 bg-surface p-3 rounded-xl border-l-4 border-success">
                     <Typography className="text-[10px] uppercase tracking-widest font-bold text-primary">
                        Owed
                     </Typography>
                     <Typography className="font-bold text-on-surface text-base">
                        ৳450
                     </Typography>
                  </View>
               </View>
            </View>
         </View>
      );
   }
   return null;
};

export default function OnboardingScreen() {
   const router = useRouter();
   const [currentIndex, setCurrentIndex] = useState(0);
   const scrollX = useRef(new Animated.Value(0)).current;
   const slidesRef = useRef<FlatList>(null);

   const viewableItemsChanged = useRef(({ viewableItems }: any) => {
      setCurrentIndex(viewableItems[0]?.index || 0);
   }).current;

   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

   const handleComplete = () => {
      router.replace("/(auth)/login");
   };

   const scrollToNext = () => {
      if (currentIndex < SLIDES.length - 1) {
         slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
      } else {
         handleComplete();
      }
   };

   const renderItem = ({ item }: { item: (typeof SLIDES)[0] }) => (
      <View
         className="flex-1 items-center justify-center px-8"
         style={{ width }}
      >
         <View className="flex-1 justify-center w-full items-center pt-[10%]">
            <RenderArtwork id={item.id} />
            <View className="w-full text-center items-center space-y-4 max-w-sm mt-8">
               <Typography
                  variant="h1"
                  className="text-on-surface text-4xl text-center font-extrabold tracking-tight leading-tight"
               >
                  {item.title}
               </Typography>
               <Typography className="text-secondary text-center text-base leading-relaxed px-4 opacity-90 mt-4">
                  {item.description}
               </Typography>
            </View>
         </View>
      </View>
   );

   return (
      <View className="flex-1 bg-background">
         {/* Background Decorators */}
         <View className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
         <View className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-info/5 rounded-full blur-[120px] pointer-events-none" />

         {/* Header */}
         <View className="w-full z-50 px-8 py-10 flex-row justify-end absolute top-0">
            <TouchableOpacity onPress={handleComplete}>
               <Typography className="text-secondary font-medium tracking-wide">
                  Skip
               </Typography>
            </TouchableOpacity>
         </View>

         <View className="flex-1 h-full">
            <FlatList
               data={SLIDES}
               renderItem={renderItem}
               horizontal
               showsHorizontalScrollIndicator={false}
               pagingEnabled
               bounces={false}
               keyExtractor={(item) => item.id}
               onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false },
               )}
               onViewableItemsChanged={viewableItemsChanged}
               viewabilityConfig={viewConfig}
               ref={slidesRef}
            />

            {/* Footer */}
            <View className="w-full px-8 pb-16 pt-8 items-center gap-10">
               {/* Progress Indicator */}
               <View className="flex-row gap-2.5">
                  {SLIDES.map((_, i) => {
                     const inputRange = [
                        (i - 1) * width,
                        i * width,
                        (i + 1) * width,
                     ];
                     const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 32, 10], // 10px inactive, 32px active
                        extrapolate: "clamp",
                     });
                     const backgroundColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ["#2D3449", "#F59E0B", "#2D3449"], // surface-containerest vs primary
                        extrapolate: "clamp",
                     });

                     return (
                        <Animated.View
                           key={i}
                           className="h-2 rounded-full"
                           style={{ width: dotWidth, backgroundColor }}
                        />
                     );
                  })}
               </View>

               {/* Primary Action Button */}
               <TouchableOpacity
                  onPress={scrollToNext}
                  className="w-full h-14 bg-primary rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 items-center justify-center flex-row gap-2"
               >
                  <Typography className="text-on-primary font-bold text-[16px] tracking-wide">
                     {SLIDES[currentIndex].actionLabel}
                  </Typography>
                  <MaterialCommunityIcons
                     name={
                        currentIndex === SLIDES.length - 1
                           ? "check"
                           : "arrow-right"
                     }
                     size={22}
                     color={Colors.icon.onPrimary}
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
