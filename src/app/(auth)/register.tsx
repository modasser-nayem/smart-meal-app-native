import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function RegisterScreen() {
   const router = useRouter();

   return (
      <Container scrollable className="bg-background">
         <View className="px-6 py-10">
            {/* Header */}
            <TouchableOpacity
               onPress={() => router.back()}
               className="mb-8 w-10 h-10 items-center justify-center bg-surface-container rounded-full"
            >
               <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.icon.onDark} />
            </TouchableOpacity>

            <View className="mb-12">
               <Typography variant="h1" className="text-[36px] font-bold text-on-surface leading-tight">
                  Create Your Account ✨
               </Typography>
               <Typography className="text-secondary text-base mt-2">
                  Join Smart Meal and start tracking.
               </Typography>
            </View>

            {/* Form */}
            <View className="space-y-6">
               <Input
                  label="Full Name"
                  placeholder="John Doe"
                  leftIcon={
                     <MaterialCommunityIcons name="account-outline" size={20} color={Colors.icon.subtle} />
                  }
               />
               <Input
                  label="Email Address"
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  leftIcon={
                     <MaterialCommunityIcons name="email-outline" size={20} color={Colors.icon.subtle} />
                  }
               />
               <Input
                  label="Password"
                  placeholder="••••••••"
                  secureTextEntry
                  leftIcon={
                     <MaterialCommunityIcons name="lock-outline" size={20} color={Colors.icon.subtle} />
                  }
               />

               <View className="flex-row items-center gap-3 mt-2">
                  <View className="w-5 h-5 border border-primary rounded-md items-center justify-center">
                     <MaterialCommunityIcons name="check" size={14} color={Colors.icon.primary} />
                  </View>
                  <Typography className="text-on-surface text-xs">
                     I agree to the{" "}
                     <Typography className="text-primary font-bold">Terms & Conditions</Typography>
                  </Typography>
               </View>

               <Button className="mt-8 bg-primary h-14 rounded-2xl shadow-xl shadow-orange-500/20">
                  Join Now
               </Button>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-12">
               <Typography className="text-on-surface text-base">
                  Already have an account?{" "}
               </Typography>
               <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Typography className="text-primary font-bold text-base ml-1">Sign In</Typography>
               </TouchableOpacity>
            </View>
         </View>
      </Container>
   );
}
