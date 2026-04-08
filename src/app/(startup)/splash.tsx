import React, { useEffect, useRef } from "react";
import { View, Animated, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Typography } from "@/components/ui/Typography";
import { Icon } from "@/components/ui/Icon";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
   const router = useRouter();
   const pulseAnim = useRef(new Animated.Value(1)).current;
   const fadeAnim = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      // Background Pulse Animation
      Animated.loop(
         Animated.sequence([
            Animated.timing(pulseAnim, {
               toValue: 1.1,
               duration: 1500,
               useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
               toValue: 1,
               duration: 1500,
               useNativeDriver: true,
            }),
         ])
      ).start();

      // Fade In Content
      Animated.sequence([
         Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
         }),
         Animated.delay(1700),
      ]).start(() => {
         router.replace("/(startup)/onboarding");
      });
   }, []);

   return (
      <View className="flex-1 bg-background relative overflow-hidden items-center justify-center px-6">
         {/* Atmospheric Background Element */}
         <View className="absolute z-0 w-[600px] h-[600px] bg-primary/5 rounded-full" style={{ left: width / 2 - 300, top: height / 2 - 300 }} />

         {/* Background Textured Image */}
         <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCftqLM7rGqY5Tfm68GlgO6rn56TgSdwMne9Q5ollgjAZbDpxjPHuc41V0GGQFwI5qE2wORW_tIl_YLL5WlyKqY02tyz82hj4ETM5LwwAnfYVBzMm1YJ_WfuEKwys9yBVlbsG6e3TKsWDBmZqLn61wqu0VrTlCQe2czaT0uHk_48pn_I_aGzS6FUm_Ktz41r3_TMxuyIZCvPLvRFixka62jg0CiGWiQlkvrqvw7jkcFxrD6JUNEU-4V-gxxVb4D5ss8yzUKW2RUHIk" }}
            className="absolute inset-0 w-full h-full opacity-10"
            resizeMode="cover"
         />

         {/* Central Content */}
         <Animated.View style={{ opacity: fadeAnim }} className="z-10 items-center w-full">
            {/* Animated Icon Container */}
            <View className="relative mb-8 items-center justify-center">
               <Animated.View 
                  style={{ transform: [{ scale: pulseAnim }] }} 
                  className="absolute w-36 h-36 bg-primary/10 rounded-full"
               />
               <View className="w-24 h-24 rounded-full bg-surface-container-high border border-primary/20 shadow-xl shadow-orange-500/20 items-center justify-center">
                  <Icon name="silverware-fork-knife" size={48} className="text-primary" />
               </View>
            </View>

            {/* Brand Identity */}
            <Typography variant="h1" className="text-[28px] font-extrabold text-white tracking-tight mb-2">
               Smart Meal
            </Typography>
            <Typography className="text-sm font-medium text-secondary tracking-wide opacity-80">
               Transparent Meals. Happy Groups.
            </Typography>

            {/* Loading Indicator */}
            <View className="mt-16 flex-row gap-1.5 items-center">
               <View className="w-1.5 h-1.5 rounded-full bg-primary/30" />
               <View className="w-1.5 h-1.5 rounded-full bg-primary" />
               <View className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            </View>
         </Animated.View>
      </View>
   );
}
