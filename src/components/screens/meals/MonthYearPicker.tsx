import { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, setMonth, setYear, getYear, getMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Colors } from "@/constants/colors";

interface MonthYearPickerProps {
   visible: boolean;
   onClose: () => void;
   selectedDate: Date;
   onSelect: (date: Date) => void;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => format(setMonth(new Date(), i), "MMMM"));
const YEARS = Array.from({ length: 10 }, (_, i) => getYear(new Date()) - 5 + i);

export const MonthYearPicker = ({
   visible,
   onClose,
   selectedDate,
   onSelect,
}: MonthYearPickerProps) => {
   // Local draft state — only committed on Apply
   const [draftMonth, setDraftMonth] = useState(getMonth(selectedDate));
   const [draftYear, setDraftYear] = useState(getYear(selectedDate));

   // Sync draft when picker opens
   useEffect(() => {
      if (visible) {
         setDraftMonth(getMonth(selectedDate));
         setDraftYear(getYear(selectedDate));
      }
   }, [visible, selectedDate]);

   const handleApply = () => {
      const result = setYear(setMonth(new Date(selectedDate), draftMonth), draftYear);
      onSelect(result);
      onClose();
   };

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
                        Select Period
                     </Typography>
                     <Typography className="text-secondary-300 text-xs mt-0.5">
                        {MONTHS[draftMonth]} {draftYear}
                     </Typography>
                  </View>
                  <TouchableOpacity
                     onPress={onClose}
                     className="w-9 h-9 rounded-full bg-surface-container items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               {/* Pickers */}
               <View className="flex-row h-64">
                  {/* Months */}
                  <ScrollView
                     className="flex-1 border-r border-outline/10"
                     showsVerticalScrollIndicator={false}
                  >
                     <View className="p-2">
                        {MONTHS.map((month, idx) => (
                           <TouchableOpacity
                              key={month}
                              onPress={() => setDraftMonth(idx)}
                              className={cn(
                                 "py-3 px-4 rounded-2xl mb-1",
                                 draftMonth === idx ? "bg-primary" : "active:bg-surface",
                              )}
                           >
                              <Typography
                                 className={cn(
                                    "font-bold text-sm",
                                    draftMonth === idx ? "text-background" : "text-secondary-300",
                                 )}
                              >
                                 {month}
                              </Typography>
                           </TouchableOpacity>
                        ))}
                     </View>
                  </ScrollView>

                  {/* Years */}
                  <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                     <View className="p-2">
                        {YEARS.map((year) => (
                           <TouchableOpacity
                              key={year}
                              onPress={() => setDraftYear(year)}
                              className={cn(
                                 "py-3 px-4 rounded-2xl mb-1 items-center",
                                 draftYear === year ? "bg-primary" : "active:bg-surface",
                              )}
                           >
                              <Typography
                                 className={cn(
                                    "font-bold text-base",
                                    draftYear === year ? "text-background" : "text-secondary-300",
                                 )}
                              >
                                 {year}
                              </Typography>
                           </TouchableOpacity>
                        ))}
                     </View>
                  </ScrollView>
               </View>

               {/* Apply button */}
               <TouchableOpacity
                  onPress={handleApply}
                  activeOpacity={0.85}
                  className="mx-4 mb-4 mt-2 h-13 bg-primary rounded-2xl items-center justify-center active:opacity-80"
                  style={{ height: 52 }}
               >
                  <Typography className="text-background font-bold text-sm uppercase tracking-widest">
                     Apply — {MONTHS[draftMonth]} {draftYear}
                  </Typography>
               </TouchableOpacity>
            </Pressable>
         </Pressable>
      </Modal>
   );
};
