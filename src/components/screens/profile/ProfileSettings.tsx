import React from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SettingRowProps {
   icon: string;
   iconColor?: string;
   label: string;
   value?: string;
   isToggle?: boolean;
   toggleValue?: boolean;
   onToggle?: (val: boolean) => void;
   onPress?: () => void;
   isLast?: boolean;
}

// ─── Single Row ───────────────────────────────────────────────────────────────

const SettingRow = ({
   icon,
   iconColor = "#F59E0B",
   label,
   value,
   isToggle = false,
   toggleValue = false,
   onToggle,
   onPress,
   isLast = false,
}: SettingRowProps) => (
   <TouchableOpacity
      onPress={onPress}
      activeOpacity={isToggle ? 1 : 0.7}
      className={`flex-row items-center justify-between px-4 py-4 active:bg-surface ${
         !isLast ? "border-b border-outline/10" : ""
      }`}
   >
      <View className="flex-row items-center gap-3 flex-1">
         <View className="w-10 h-10 rounded-xl bg-surface items-center justify-center">
            <MaterialCommunityIcons name={icon as any} size={20} color={iconColor} />
         </View>
         <Typography className="text-on-surface font-medium text-base">{label}</Typography>
      </View>

      {isToggle ? (
         <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: "#334155", true: "#F59E0B" }}
            thumbColor={toggleValue ? "#0F172A" : "#94A3B8"}
         />
      ) : value !== undefined ? (
         <View className="flex-row items-center gap-1.5">
            <Typography className="text-secondary-300 text-sm font-medium">{value}</Typography>
            <MaterialCommunityIcons name="chevron-right" size={16} color="#334155" />
         </View>
      ) : (
         <MaterialCommunityIcons name="chevron-right" size={18} color="#334155" />
      )}
   </TouchableOpacity>
);

// ─── Section ──────────────────────────────────────────────────────────────────

interface SettingsSectionProps {
   label: string;
   labelColor?: string;
   children: React.ReactNode;
}

const SettingsSection = ({
   label,
   labelColor = "text-secondary-300",
   children,
}: SettingsSectionProps) => (
   <View>
      <Typography
         className={`text-[10px] uppercase font-black tracking-widest mb-3 ml-1 ${labelColor}`}
      >
         {label}
      </Typography>
      <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
         {children}
      </View>
   </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProfileSettingsProps {
   notificationsEnabled: boolean;
   onToggleNotifications: (val: boolean) => void;
   onEditProfile?: () => void;
   onChangePassword?: () => void;
   onLanguage?: () => void;
   onHelpCenter?: () => void;
   onPrivacyPolicy?: () => void;
   onLogout?: () => void;
   onDeleteAccount?: () => void;
}

export const ProfileSettings = ({
   notificationsEnabled,
   onToggleNotifications,
   onEditProfile,
   onChangePassword,
   onLanguage,
   onHelpCenter,
   onPrivacyPolicy,
   onLogout,
   onDeleteAccount,
}: ProfileSettingsProps) => {
   return (
      <View className="mx-6 gap-6">
         {/* Account */}
         <SettingsSection label="Account">
            <SettingRow icon="account-edit-outline" label="Edit Profile" onPress={onEditProfile} />
            <SettingRow
               icon="shield-lock-outline"
               label="Security & Password"
               onPress={onChangePassword}
            />
            <SettingRow
               icon="bell-outline"
               label="Notifications"
               isToggle
               toggleValue={notificationsEnabled}
               onToggle={onToggleNotifications}
               isLast
            />
         </SettingsSection>

         {/* App */}
         <SettingsSection label="App Settings">
            <SettingRow icon="translate" label="Language" value="English" onPress={onLanguage} />
            <SettingRow icon="theme-light-dark" label="Display Mode" value="Dark" isLast />
         </SettingsSection>

         {/* Support */}
         <SettingsSection label="Support">
            <SettingRow icon="help-circle-outline" label="Help Center" onPress={onHelpCenter} />
            <SettingRow
               icon="file-document-outline"
               label="Privacy Policy"
               onPress={onPrivacyPolicy}
               isLast
            />
         </SettingsSection>

         <SettingsSection label="Danger Zone" labelColor="text-error">
            <TouchableOpacity
               onPress={onLogout}
               activeOpacity={0.7}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface border-b border-outline/10"
            >
               <View className="w-10 h-10 rounded-xl bg-error/10 items-center justify-center">
                  <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
               </View>
               <Typography className="text-error font-bold text-base">Log Out</Typography>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={onDeleteAccount}
               activeOpacity={0.7}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface"
            >
               <View className="w-10 h-10 rounded-xl bg-error/10 items-center justify-center">
                  <MaterialCommunityIcons name="delete-forever-outline" size={20} color="#EF4444" />
               </View>
               <View className="flex-1">
                  <Typography className="text-error font-bold text-base">Delete Account</Typography>
                  <Typography className="text-secondary-300 text-xs mt-0.5">
                     This action is permanent and cannot be undone
                  </Typography>
               </View>
            </TouchableOpacity>
         </SettingsSection>
      </View>
   );
};
