import { useState } from "react";
import { View, Modal, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { useCurrency } from "@/context/CurrencyContext";
import { SUPPORTED_CURRENCIES, SupportedCurrency } from "@/constants/currency";
import { Colors } from "@/constants/colors";

interface CurrencySelectorProps {
   visible: boolean;
   onClose: () => void;
}

export const CurrencySelector = ({ visible, onClose }: CurrencySelectorProps) => {
   const { currency, setCurrency } = useCurrency();
   const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(currency);

   const handleSelect = async (curr: SupportedCurrency) => {
      setSelectedCurrency(curr);
      await setCurrency(curr);
      onClose();
   };

   const currencies = Object.entries(SUPPORTED_CURRENCIES) as Array<
      [SupportedCurrency, (typeof SUPPORTED_CURRENCIES)[SupportedCurrency]]
   >;

   return (
      <Modal visible={visible} transparent animationType="fade">
         <Pressable
            onPress={onClose}
            className="flex-1 bg-black/60 items-center justify-center p-6"
         >
            <Pressable className="bg-surface-container rounded-[32px] w-full max-w-sm overflow-hidden border border-outline/10">
               {/* Header */}
               <View className="px-6 py-4 border-b border-outline/10 flex-row justify-between items-center bg-surface">
                  <View>
                     <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                        Select Currency
                     </Typography>
                     <Typography className="text-secondary-300 text-xs mt-0.5">
                        Choose your preferred currency
                     </Typography>
                  </View>
                  <TouchableOpacity
                     onPress={onClose}
                     className="w-9 h-9 rounded-full bg-surface-container items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               {/* Currency List */}
               <ScrollView showsVerticalScrollIndicator={false} className="max-h-96">
                  <View className="p-2">
                     {currencies.map(([code, info]) => {
                        const isSelected = selectedCurrency === code;
                        return (
                           <TouchableOpacity
                              key={code}
                              onPress={() => handleSelect(code)}
                              className={`flex-row items-center gap-3 px-4 py-3.5 rounded-2xl mb-1 border ${
                                 isSelected
                                    ? "bg-primary/10 border-primary/30"
                                    : "bg-surface border-outline/10 active:bg-surface-container"
                              }`}
                           >
                              {/* Symbol */}
                              <View
                                 className={`w-10 h-10 rounded-xl items-center justify-center ${
                                    isSelected ? "bg-primary/20" : "bg-surface-container"
                                 }`}
                              >
                                 <Typography
                                    className={`text-lg font-bold ${
                                       isSelected ? "text-primary" : "text-on-surface"
                                    }`}
                                 >
                                    {info.symbol}
                                 </Typography>
                              </View>

                              {/* Info */}
                              <View className="flex-1">
                                 <Typography
                                    className={`font-bold text-sm ${
                                       isSelected ? "text-primary" : "text-on-surface"
                                    }`}
                                 >
                                    {code}
                                 </Typography>
                                 <Typography className="text-secondary-400 text-xs mt-0.5">
                                    {info.label}
                                 </Typography>
                              </View>

                              {/* Checkmark */}
                              {isSelected && (
                                 <View className="w-5 h-5 rounded-full bg-primary items-center justify-center">
                                    <MaterialCommunityIcons
                                       name="check"
                                       size={12}
                                       color={Colors.icon.onPrimary}
                                    />
                                 </View>
                              )}
                           </TouchableOpacity>
                        );
                     })}
                  </View>
               </ScrollView>
            </Pressable>
         </Pressable>
      </Modal>
   );
};
