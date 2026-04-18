import React, { useState } from "react";
import {
   View,
   TouchableOpacity,
   Modal,
   KeyboardAvoidingView,
   Platform,
   TextInput,
} from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

interface JoinGroupModalProps {
   visible: boolean;
   onClose: () => void;
   onJoin: (code: string) => void;
   isLoading?: boolean;
}

export const JoinGroupModal = ({
   visible,
   onClose,
   onJoin,
   isLoading = false,
}: JoinGroupModalProps) => {
   const [code, setCode] = useState("");

   const handleJoin = () => {
      const trimmed = code.trim().toUpperCase();
      if (trimmed.length < 4) return;
      onJoin(trimmed);
   };

   const handleClose = () => {
      setCode("");
      onClose();
   };

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
         >
            {/* Backdrop */}
            <TouchableOpacity
               className="flex-1 bg-black/60"
               activeOpacity={1}
               onPress={handleClose}
            />

            {/* Sheet */}
            <View className="bg-surface-container rounded-t-[32px] px-6 pt-5 pb-10 border-t border-outline/10">
               {/* Handle */}
               <View className="w-10 h-1 rounded-full bg-outline/30 self-center mb-6" />

               {/* Header */}
               <View className="flex-row items-center justify-between mb-6">
                  <View>
                     <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                        Join a Group
                     </Typography>
                     <Typography className="text-secondary-300 text-sm mt-0.5">
                        Enter the invite code shared by the group owner
                     </Typography>
                  </View>
                  <TouchableOpacity
                     onPress={handleClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               {/* Code Input */}
               <View className="mb-6">
                  <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                     Invite Code
                  </Typography>
                  <View className="flex-row items-center bg-surface border border-outline/30 rounded-2xl px-4 h-16 gap-3">
                     <MaterialCommunityIcons name="pound" size={20} color={Colors.icon.primary} />
                     <TextInput
                        value={code}
                        onChangeText={(t) => setCode(t.toUpperCase())}
                        placeholder="e.g. BCHH-4821"
                        placeholderTextColor={Colors.placeholder}
                        autoCapitalize="characters"
                        autoCorrect={false}
                        maxLength={12}
                        className="flex-1 text-on-surface text-lg font-mono font-bold tracking-widest"
                     />
                     {code.length > 0 && (
                        <TouchableOpacity onPress={() => setCode("")} activeOpacity={0.7}>
                           <MaterialCommunityIcons name="close-circle" size={18} color={Colors.icon.muted} />
                        </TouchableOpacity>
                     )}
                  </View>
               </View>

               {/* Join Button */}
               <TouchableOpacity
                  onPress={handleJoin}
                  activeOpacity={0.8}
                  disabled={code.trim().length < 4 || isLoading}
                  className={`h-14 rounded-2xl items-center justify-center flex-row gap-2 ${
                     code.trim().length >= 4 && !isLoading
                        ? "bg-primary active:scale-[0.98]"
                        : "bg-surface"
                  }`}
               >
                  <MaterialCommunityIcons
                     name="account-plus"
                     size={20}
                     color={code.trim().length >= 4 && !isLoading ? "#0F172A" : "#334155"}
                  />
                  <Typography
                     className={`font-bold text-base ${
                        code.trim().length >= 4 && !isLoading
                           ? "text-background"
                           : "text-secondary-400"
                     }`}
                  >
                     {isLoading ? "Joining..." : "Join Group"}
                  </Typography>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   );
};
