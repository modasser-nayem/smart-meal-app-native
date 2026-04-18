import { View, TouchableOpacity, Switch } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/colors";

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

const SettingRow = ({
   icon,
   iconColor = Colors.icon.primary,
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
            trackColor={{ false: Colors.icon.muted, true: Colors.primary }}
            thumbColor={toggleValue ? Colors.onPrimary : Colors.textSubtle}
         />
      ) : value !== undefined ? (
         <View className="flex-row items-center gap-1.5">
            <Typography className="text-secondary-300 text-sm font-medium">{value}</Typography>
            <MaterialCommunityIcons name="chevron-right" size={16} color={Colors.icon.muted} />
         </View>
      ) : (
         <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.icon.muted} />
      )}
   </TouchableOpacity>
);

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

interface ProfileSettingsProps {
   notificationsEnabled: boolean;
   onToggleNotifications: (val: boolean) => void;
   onEditProfile?: () => void;
   onChangePassword?: () => void;
   onLanguage?: () => void;
   onCurrency?: () => void;
   onHelpCenter?: () => void;
   onPrivacyPolicy?: () => void;
   onLogout?: () => void;
   onDeleteAccount?: () => void;
   languageLabel?: string;
   currencyLabel?: string;
}

export const ProfileSettings = ({
   notificationsEnabled,
   onToggleNotifications,
   onEditProfile,
   onChangePassword,
   onLanguage,
   onCurrency,
   onHelpCenter,
   onPrivacyPolicy,
   onLogout,
   onDeleteAccount,
   languageLabel,
   currencyLabel,
}: ProfileSettingsProps) => {
   const { t } = useTranslation("profile");

   return (
      <View className="mx-6 gap-6">
         {/* Account */}
         <SettingsSection label={t("sections.account")}>
            <SettingRow
               icon="account-edit-outline"
               label={t("settings.editProfile")}
               onPress={onEditProfile}
            />
            <SettingRow
               icon="shield-lock-outline"
               label={t("settings.securityPassword")}
               onPress={onChangePassword}
            />
            <SettingRow
               icon="bell-outline"
               label={t("settings.notifications")}
               isToggle
               toggleValue={notificationsEnabled}
               onToggle={onToggleNotifications}
               isLast
            />
         </SettingsSection>

         {/* App Settings */}
         <SettingsSection label={t("sections.appSettings")}>
            <SettingRow
               icon="translate"
               label={t("settings.language")}
               value={languageLabel}
               onPress={onLanguage}
            />
            <SettingRow
               icon="currency-usd"
               label={t("settings.currency")}
               value={currencyLabel}
               onPress={onCurrency}
            />
            <SettingRow
               icon="theme-light-dark"
               label={t("settings.displayMode")}
               value={t("settings.displayModeValue")}
               isLast
            />
         </SettingsSection>

         {/* Support */}
         <SettingsSection label={t("sections.support")}>
            <SettingRow
               icon="help-circle-outline"
               label={t("settings.helpCenter")}
               onPress={onHelpCenter}
            />
            <SettingRow
               icon="file-document-outline"
               label={t("settings.privacyPolicy")}
               onPress={onPrivacyPolicy}
               isLast
            />
         </SettingsSection>

         {/* Danger Zone */}
         <SettingsSection label={t("sections.dangerZone")} labelColor="text-error">
            <TouchableOpacity
               onPress={onLogout}
               activeOpacity={0.7}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface border-b border-outline/10"
            >
               <View className="w-10 h-10 rounded-xl bg-error/10 items-center justify-center">
                  <MaterialCommunityIcons name="logout" size={20} color={Colors.icon.error} />
               </View>
               <Typography className="text-error font-bold text-base">
                  {t("settings.logOut")}
               </Typography>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={onDeleteAccount}
               activeOpacity={0.7}
               className="flex-row items-center gap-3 px-4 py-4 active:bg-surface"
            >
               <View className="w-10 h-10 rounded-xl bg-error/10 items-center justify-center">
                  <MaterialCommunityIcons
                     name="delete-forever-outline"
                     size={20}
                     color={Colors.icon.error}
                  />
               </View>
               <View className="flex-1">
                  <Typography className="text-error font-bold text-base">
                     {t("settings.deleteAccount")}
                  </Typography>
                  <Typography className="text-secondary-300 text-xs mt-0.5">
                     {t("settings.deleteAccountDesc")}
                  </Typography>
               </View>
            </TouchableOpacity>
         </SettingsSection>
      </View>
   );
};
