import { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components/ui/Typography";
import { Colors } from "@/constants/colors";
import { SUPPORTED_LANGUAGES, SupportedLanguage, changeLanguage } from "@/i18n";

interface LanguageSelectorProps {
   visible: boolean;
   onClose: () => void;
}

export const LanguageSelector = ({ visible, onClose }: LanguageSelectorProps) => {
   const { t, i18n } = useTranslation("profile");
   const currentLang = i18n.language as SupportedLanguage;
   const [changing, setChanging] = useState(false);

   const handleSelect = async (lang: SupportedLanguage) => {
      if (lang === currentLang || changing) return;
      setChanging(true);
      await changeLanguage(lang);
      setChanging(false);
      onClose();
   };

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={onClose}
         statusBarTranslucent
      >
         {/* Backdrop */}
         <TouchableOpacity className="flex-1 bg-black/60" activeOpacity={1} onPress={onClose} />

         {/* Sheet */}
         <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10 pb-10">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-outline/10">
               <View>
                  <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                     {t("language.title")}
                  </Typography>
                  <Typography className="text-secondary-300 text-xs mt-0.5">
                     {t("language.subtitle")}
                  </Typography>
               </View>
               <TouchableOpacity
                  onPress={onClose}
                  className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
               >
                  <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
               </TouchableOpacity>
            </View>

            {/* Language list */}
            <View className="px-5 pt-4 gap-3">
               {(
                  Object.entries(SUPPORTED_LANGUAGES) as [
                     SupportedLanguage,
                     (typeof SUPPORTED_LANGUAGES)[SupportedLanguage],
                  ][]
               ).map(([code, meta]) => {
                  const isSelected = currentLang === code;
                  return (
                     <TouchableOpacity
                        key={code}
                        onPress={() => handleSelect(code)}
                        activeOpacity={0.8}
                        disabled={changing}
                        className={`flex-row items-center gap-4 px-4 py-4 rounded-2xl border ${
                           isSelected
                              ? "bg-primary/5 border-primary/25"
                              : "bg-surface border-outline/15 active:bg-surface-container"
                        }`}
                     >
                        {/* Flag */}
                        <Typography className="text-2xl">{meta.flag}</Typography>

                        {/* Labels */}
                        <View className="flex-1">
                           <Typography className="text-on-surface font-bold text-[15px]">
                              {meta.nativeLabel}
                           </Typography>
                           <Typography className="text-secondary-400 text-xs mt-0.5">
                              {meta.label}
                           </Typography>
                        </View>

                        {/* Selected indicator */}
                        {isSelected ? (
                           <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                              <MaterialCommunityIcons
                                 name="check"
                                 size={14}
                                 color={Colors.icon.onPrimary}
                              />
                           </View>
                        ) : (
                           <View className="w-6 h-6 rounded-full border-2 border-outline/30" />
                        )}
                     </TouchableOpacity>
                  );
               })}
            </View>
         </View>
      </Modal>
   );
};
