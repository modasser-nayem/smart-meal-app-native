import {
   View,
   Modal,
   TouchableOpacity,
   ScrollView,
   Pressable,
} from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, setMonth, setYear, getYear, getMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface MonthYearPickerProps {
   visible: boolean;
   onClose: () => void;
   selectedDate: Date;
   onSelect: (date: Date) => void;
}

const MONTHS = Array.from({ length: 12 }, (_, i) =>
   format(setMonth(new Date(), i), "MMMM"),
);
const YEARS = Array.from({ length: 10 }, (_, i) => getYear(new Date()) - 5 + i);

export const MonthYearPicker = ({
   visible,
   onClose,
   selectedDate,
   onSelect,
}: MonthYearPickerProps) => {
   const currentMonth = getMonth(selectedDate);
   const currentYear = getYear(selectedDate);

   return (
      <Modal
         visible={visible}
         transparent
         animationType="fade"
      >
         <Pressable
            onPress={onClose}
            className="flex-1 bg-black/60 items-center justify-center p-6"
         >
            <Pressable className="bg-surface-container rounded-[40px] w-full max-w-sm overflow-hidden border border-outline/10 shadow-2xl">
               <View className="p-6 border-b border-outline/10 flex-row justify-between items-center bg-surface-container-high">
                  <Typography className="text-xl font-black text-on-surface">
                     Select Period
                  </Typography>
                  <TouchableOpacity onPress={onClose}>
                     <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color="#F59E0B"
                     />
                  </TouchableOpacity>
               </View>

               <View className="flex-row h-72">
                  {/* Months Column */}
                  <ScrollView
                     className="flex-1 border-r border-outline/10"
                     showsVerticalScrollIndicator={false}
                  >
                     <View className="p-2">
                        {MONTHS.map((month, idx) => (
                           <TouchableOpacity
                              key={month}
                              onPress={() =>
                                 onSelect(setMonth(new Date(selectedDate), idx))
                              }
                              className={cn(
                                 "py-3 px-4 rounded-2xl mb-1",
                                 currentMonth === idx
                                    ? "bg-primary"
                                    : "active:bg-primary/10",
                              )}
                           >
                              <Typography
                                 className={cn(
                                    "font-bold text-sm",
                                    currentMonth === idx
                                       ? "text-surface/80"
                                       : "text-on-surface/60",
                                 )}
                              >
                                 {month}
                              </Typography>
                           </TouchableOpacity>
                        ))}
                     </View>
                  </ScrollView>

                  {/* Years Column */}
                  <ScrollView
                     className="flex-1"
                     showsVerticalScrollIndicator={false}
                  >
                     <View className="p-2">
                        {YEARS.map((year) => (
                           <TouchableOpacity
                              key={year}
                              onPress={() =>
                                 onSelect(setYear(new Date(selectedDate), year))
                              }
                              className={cn(
                                 "py-3 px-4 rounded-2xl mb-1 items-center",
                                 currentYear === year
                                    ? "bg-primary"
                                    : "active:bg-surface-container",
                              )}
                           >
                              <Typography
                                 className={cn(
                                    "font-bold text-base",
                                    currentYear === year
                                       ? "text-surface/80"
                                       : "text-on-surface/60",
                                 )}
                              >
                                 {year}
                              </Typography>
                           </TouchableOpacity>
                        ))}
                     </View>
                  </ScrollView>
               </View>

               <TouchableOpacity
                  onPress={onClose}
                  className="m-4 h-12 bg-primary rounded-[24px] items-center justify-center shadow-lg shadow-primary/20"
               >
                  <Typography className="text-on-primary font-black uppercase tracking-widest text-xs">
                     Apply Selection
                  </Typography>
               </TouchableOpacity>
            </Pressable>
         </Pressable>
      </Modal>
   );
};
