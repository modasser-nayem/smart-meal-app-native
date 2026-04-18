import { useState } from "react";
import { View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";

import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { changePasswordSchema, ChangePasswordFormData } from "@/schemas/profile.schema";
import { Colors } from "@/constants/colors";

// ─── Password strength helper ─────────────────────────────────────────────────

const getStrength = (password: string): { level: number; label: string; color: string } => {
   if (!password) return { level: 0, label: "", color: "" };
   let score = 0;
   if (password.length >= 8) score++;
   if (password.length >= 12) score++;
   if (/[A-Z]/.test(password)) score++;
   if (/[0-9]/.test(password)) score++;
   if (/[^A-Za-z0-9]/.test(password)) score++;

   if (score <= 2) return { level: score, label: "Weak", color: Colors.icon.error };
   if (score === 3) return { level: score, label: "Fair", color: Colors.icon.warning };
   if (score === 4) return { level: score, label: "Good", color: Colors.icon.success };
   return { level: score, label: "Strong", color: Colors.icon.success };
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SecurityModal() {
   const router = useRouter();
   const [showCurrent, setShowCurrent] = useState(false);
   const [showNew, setShowNew] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<ChangePasswordFormData>({
      resolver: yupResolver(changePasswordSchema),
      defaultValues: {
         currentPassword: "",
         newPassword: "",
         confirmPassword: "",
      },
   });

   const newPasswordValue = watch("newPassword");
   const strength = getStrength(newPasswordValue);

   const onSubmit = async (data: ChangePasswordFormData) => {
      setIsLoading(true);
      try {
         // TODO: wire up real API — e.g. await changePassword(data).unwrap()
         await new Promise((r) => setTimeout(r, 800)); // simulate
         Toast.success("Password changed successfully");
         router.back();
      } catch (error: any) {
         Toast.error(error?.data?.message || "Failed to change password");
      } finally {
         setIsLoading(false);
      }
   };

   const EyeToggle = ({ visible, onToggle }: { visible: boolean; onToggle: () => void }) => (
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
         <MaterialCommunityIcons
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={Colors.icon.subtle}
         />
      </TouchableOpacity>
   );

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         className="flex-1 bg-background"
      >
         <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 48 }}
            keyboardShouldPersistTaps="handled"
         >
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-14 pb-6 border-b border-outline/10">
               <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full bg-surface items-center justify-center active:scale-90"
               >
                  <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.icon.onDark} />
               </TouchableOpacity>
               <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                  Security & Password
               </Typography>
               <View className="w-10" />
            </View>

            <View className="px-6 pt-8">
               {/* Info banner */}
               <View className="flex-row items-start gap-3 bg-info/10 border border-info/20 rounded-2xl px-4 py-4 mb-8">
                  <MaterialCommunityIcons
                     name="information-outline"
                     size={20}
                     color={Colors.icon.info}
                  />
                  <Typography className="text-secondary-100 text-sm flex-1 leading-relaxed">
                     Use a strong password with at least 8 characters, including uppercase letters,
                     numbers, and symbols.
                  </Typography>
               </View>

               {/* Current Password */}
               <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        label="Current Password"
                        placeholder="••••••••"
                        secureTextEntry={!showCurrent}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.currentPassword?.message}
                        leftIcon={
                           <MaterialCommunityIcons
                              name="lock-outline"
                              size={20}
                              color={Colors.icon.subtle}
                           />
                        }
                        rightIcon={
                           <EyeToggle
                              visible={showCurrent}
                              onToggle={() => setShowCurrent((v) => !v)}
                           />
                        }
                     />
                  )}
               />

               {/* Divider */}
               <View className="flex-row items-center gap-3 mb-5">
                  <View className="flex-1 h-px bg-outline/20" />
                  <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest">
                     New Password
                  </Typography>
                  <View className="flex-1 h-px bg-outline/20" />
               </View>

               {/* New Password */}
               <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        label="New Password"
                        placeholder="••••••••"
                        secureTextEntry={!showNew}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.newPassword?.message}
                        leftIcon={
                           <MaterialCommunityIcons
                              name="lock-plus-outline"
                              size={20}
                              color={Colors.icon.subtle}
                           />
                        }
                        rightIcon={
                           <EyeToggle visible={showNew} onToggle={() => setShowNew((v) => !v)} />
                        }
                     />
                  )}
               />

               {/* Strength meter */}
               {newPasswordValue.length > 0 && (
                  <View className="mb-5 -mt-2">
                     <View className="flex-row gap-1.5 mb-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                           <View
                              key={i}
                              className="flex-1 h-1 rounded-full"
                              style={{
                                 backgroundColor:
                                    i <= strength.level ? strength.color : Colors.icon.muted,
                              }}
                           />
                        ))}
                     </View>
                     <Typography
                        className="text-xs font-bold ml-1"
                        style={{ color: strength.color }}
                     >
                        {strength.label}
                     </Typography>
                  </View>
               )}

               {/* Confirm Password */}
               <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        label="Confirm New Password"
                        placeholder="••••••••"
                        secureTextEntry={!showConfirm}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.confirmPassword?.message}
                        leftIcon={
                           <MaterialCommunityIcons
                              name="lock-check-outline"
                              size={20}
                              color={Colors.icon.subtle}
                           />
                        }
                        rightIcon={
                           <EyeToggle
                              visible={showConfirm}
                              onToggle={() => setShowConfirm((v) => !v)}
                           />
                        }
                     />
                  )}
               />

               {/* Requirements checklist */}
               <View className="bg-surface-container rounded-2xl px-4 py-4 mb-8 gap-2.5 border border-outline/10">
                  <Typography className="text-secondary-300 text-[10px] uppercase font-black tracking-widest mb-1">
                     Requirements
                  </Typography>
                  {[
                     { label: "At least 8 characters", met: newPasswordValue.length >= 8 },
                     { label: "One uppercase letter", met: /[A-Z]/.test(newPasswordValue) },
                     { label: "One number", met: /[0-9]/.test(newPasswordValue) },
                     { label: "One special character", met: /[^A-Za-z0-9]/.test(newPasswordValue) },
                  ].map(({ label, met }) => (
                     <View key={label} className="flex-row items-center gap-2.5">
                        <MaterialCommunityIcons
                           name={met ? "check-circle" : "circle-outline"}
                           size={16}
                           color={met ? Colors.icon.success : "#334155"}
                        />
                        <Typography
                           className={`text-sm ${met ? "text-success" : "text-secondary-400"}`}
                        >
                           {label}
                        </Typography>
                     </View>
                  ))}
               </View>

               {/* Submit */}
               <Button
                  onPress={handleSubmit(onSubmit)}
                  loading={isLoading}
                  fullWidth
                  size="lg"
                  className="rounded-2xl"
               >
                  Update Password
               </Button>

               <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="items-center mt-4 py-3"
               >
                  <Typography className="text-secondary-300 font-medium text-sm">Cancel</Typography>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
