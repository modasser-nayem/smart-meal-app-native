import { useState } from "react";
import {
   View,
   TouchableOpacity,
   Modal,
   KeyboardAvoidingView,
   Platform,
   TextInput,
   ScrollView,
   Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { format, addDays, subDays } from "date-fns";
import { Colors } from "@/constants/colors";

// ─── Types ────────────────────────────────────────────────────────────────────

type MealType = "breakfast" | "lunch" | "dinner";
type MealQuantities = Record<MealType, number>;

export interface LogMealMember {
   id: string;
   name: string;
   initials: string;
   avatar?: string;
}

interface LogMealSheetProps {
   visible: boolean;
   selectedDate: Date;
   onClose: () => void;
   // Self log
   onSubmit: (data: {
      date: string;
      meals: { type: MealType; quantity: number }[];
      note?: string;
   }) => void;
   // Admin log (manager/owner only)
   onAdminSubmit?: (data: {
      targetUserId: string;
      date: string;
      meals: { type: MealType; quantity: number }[];
      note?: string;
   }) => void;
   isLoading?: boolean;
   // If provided, shows member selector (manager/owner mode)
   members?: LogMealMember[];
   userRole?: "Owner" | "Manager" | "Member";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MEAL_OPTIONS: {
   key: MealType;
   label: string;
   icon: string;
   time: string;
   color: string;
   bg: string;
}[] = [
   {
      key: "breakfast",
      label: "Breakfast",
      icon: "weather-sunset",
      time: "Morning",
      color: Colors.icon.primary,
      bg: "bg-primary/10",
   },
   {
      key: "lunch",
      label: "Lunch",
      icon: "weather-sunny",
      time: "Afternoon",
      color: Colors.icon.success,
      bg: "bg-accent/10",
   },
   {
      key: "dinner",
      label: "Dinner",
      icon: "weather-night",
      time: "Evening",
      color: Colors.icon.info,
      bg: "bg-info/10",
   },
];

// ─── Quantity Stepper ─────────────────────────────────────────────────────────

const QuantityStepper = ({
   value,
   onChange,
   color,
}: {
   value: number;
   onChange: (v: number) => void;
   color: string;
}) => (
   <View className="flex-row items-center gap-2">
      <TouchableOpacity
         onPress={() => onChange(Math.max(0, value - 1))}
         activeOpacity={0.75}
         className="w-8 h-8 rounded-full bg-surface border border-outline/20 items-center justify-center active:scale-90"
      >
         <MaterialCommunityIcons name="minus" size={16} color={Colors.icon.subtle} />
      </TouchableOpacity>
      <View className="w-8 items-center">
         <Typography
            className="text-on-surface font-extrabold text-lg"
            style={{ color: value > 0 ? color : Colors.icon.dim }}
         >
            {value}
         </Typography>
      </View>
      <TouchableOpacity
         onPress={() => onChange(Math.min(9, value + 1))}
         activeOpacity={0.75}
         className="w-8 h-8 rounded-full bg-surface border border-outline/20 items-center justify-center active:scale-90"
      >
         <MaterialCommunityIcons name="plus" size={16} color={Colors.icon.subtle} />
      </TouchableOpacity>
   </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const LogMealSheet = ({
   visible,
   selectedDate,
   onClose,
   onSubmit,
   onAdminSubmit,
   isLoading = false,
   members = [],
   userRole = "Member",
}: LogMealSheetProps) => {
   const isAdmin = userRole === "Owner" || userRole === "Manager";

   const [quantities, setQuantities] = useState<MealQuantities>({
      breakfast: 0,
      lunch: 0,
      dinner: 0,
   });
   const [note, setNote] = useState("");
   const [date, setDate] = useState<Date>(selectedDate);
   const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
   const [mode, setMode] = useState<"self" | "member">("self");

   const totalMeals = quantities.breakfast + quantities.lunch + quantities.dinner;
   const activeMeals = MEAL_OPTIONS.filter((m) => quantities[m.key] > 0);

   const setQty = (meal: MealType, val: number) => {
      setQuantities((prev) => ({ ...prev, [meal]: val }));
   };

   const handleSubmit = () => {
      if (totalMeals === 0) return;
      const meals = activeMeals.map((m) => ({ type: m.key, quantity: quantities[m.key] }));
      const dateStr = format(date, "yyyy-MM-dd");

      if (mode === "member" && selectedMemberId && onAdminSubmit) {
         onAdminSubmit({
            targetUserId: selectedMemberId,
            date: dateStr,
            meals,
            note: note.trim() || undefined,
         });
      } else {
         onSubmit({ date: dateStr, meals, note: note.trim() || undefined });
      }
      handleClose();
   };

   const handleClose = () => {
      setQuantities({ breakfast: 0, lunch: 0, dinner: 0 });
      setNote("");
      setDate(selectedDate);
      setSelectedMemberId(null);
      setMode("self");
      onClose();
   };

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={handleClose}
         statusBarTranslucent
      >
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
         >
            <TouchableOpacity
               className="flex-1 bg-black/60"
               activeOpacity={1}
               onPress={handleClose}
            />

            <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10 max-h-[90%]">
               {/* Handle */}
               <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

               {/* Header */}
               <View className="flex-row items-center justify-between px-6 py-4 border-b border-outline/10">
                  <View>
                     <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                        Log Meal
                     </Typography>
                     <Typography className="text-secondary-300 text-xs mt-0.5">
                        Set quantities for each meal
                     </Typography>
                  </View>
                  <TouchableOpacity
                     onPress={handleClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
               >
                  <View className="px-6 pt-5 gap-5">
                     {/* ── Date picker row ── */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Date
                        </Typography>
                        <View className="flex-row items-center gap-3 bg-surface rounded-2xl px-4 py-3 border border-outline/15">
                           <TouchableOpacity
                              onPress={() => setDate((d) => subDays(d, 1))}
                              activeOpacity={0.75}
                              className="w-9 h-9 rounded-xl bg-surface-container items-center justify-center active:scale-90"
                           >
                              <MaterialCommunityIcons
                                 name="chevron-left"
                                 size={20}
                                 color={Colors.icon.subtle}
                              />
                           </TouchableOpacity>
                           <View className="flex-1 items-center">
                              <Typography className="text-on-surface font-bold text-[15px]">
                                 {format(date, "EEEE, MMMM d")}
                              </Typography>
                              <Typography className="text-secondary-400 text-xs mt-0.5">
                                 {format(date, "yyyy")}
                              </Typography>
                           </View>
                           <TouchableOpacity
                              onPress={() => setDate((d) => addDays(d, 1))}
                              activeOpacity={0.75}
                              className="w-9 h-9 rounded-xl bg-surface-container items-center justify-center active:scale-90"
                           >
                              <MaterialCommunityIcons
                                 name="chevron-right"
                                 size={20}
                                 color={Colors.icon.subtle}
                              />
                           </TouchableOpacity>
                        </View>
                     </View>

                     {/* ── Admin: mode toggle + member selector ── */}
                     {isAdmin && members.length > 0 && (
                        <View>
                           <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                              Log For
                           </Typography>
                           {/* Mode toggle */}
                           <View className="flex-row bg-surface rounded-2xl p-1 border border-outline/15 mb-3">
                              <TouchableOpacity
                                 onPress={() => {
                                    setMode("self");
                                    setSelectedMemberId(null);
                                 }}
                                 activeOpacity={0.8}
                                 className={`flex-1 py-2.5 rounded-xl items-center ${mode === "self" ? "bg-primary" : ""}`}
                              >
                                 <Typography
                                    className={`text-sm font-bold ${mode === "self" ? "text-background" : "text-secondary-300"}`}
                                 >
                                    Myself
                                 </Typography>
                              </TouchableOpacity>
                              <TouchableOpacity
                                 onPress={() => setMode("member")}
                                 activeOpacity={0.8}
                                 className={`flex-1 py-2.5 rounded-xl items-center ${mode === "member" ? "bg-primary" : ""}`}
                              >
                                 <Typography
                                    className={`text-sm font-bold ${mode === "member" ? "text-background" : "text-secondary-300"}`}
                                 >
                                    A Member
                                 </Typography>
                              </TouchableOpacity>
                           </View>

                           {/* Member list */}
                           {mode === "member" && (
                              <ScrollView
                                 horizontal
                                 showsHorizontalScrollIndicator={false}
                                 contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
                              >
                                 {members.map((m) => {
                                    const isSelected = selectedMemberId === m.id;
                                    return (
                                       <TouchableOpacity
                                          key={m.id}
                                          onPress={() => setSelectedMemberId(m.id)}
                                          activeOpacity={0.8}
                                          className={`items-center gap-1.5 px-3 py-2 rounded-2xl border ${
                                             isSelected
                                                ? "bg-primary/10 border-primary/30"
                                                : "bg-surface border-outline/15"
                                          }`}
                                       >
                                          {m.avatar ? (
                                             <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-outline/20">
                                                <Image
                                                   source={{ uri: m.avatar }}
                                                   className="w-full h-full"
                                                   resizeMode="cover"
                                                />
                                             </View>
                                          ) : (
                                             <View className="w-10 h-10 rounded-full bg-surface-container border border-outline/20 items-center justify-center">
                                                <Typography className="text-on-surface font-bold text-sm">
                                                   {m.initials}
                                                </Typography>
                                             </View>
                                          )}
                                          <Typography
                                             className={`text-[10px] font-bold ${isSelected ? "text-primary" : "text-secondary-300"}`}
                                          >
                                             {m.name.split(" ")[0]}
                                          </Typography>
                                          {isSelected && (
                                             <View className="w-4 h-4 rounded-full bg-primary items-center justify-center">
                                                <MaterialCommunityIcons
                                                   name="check"
                                                   size={10}
                                                   color={Colors.icon.onPrimary}
                                                />
                                             </View>
                                          )}
                                       </TouchableOpacity>
                                    );
                                 })}
                              </ScrollView>
                           )}
                        </View>
                     )}

                     {/* ── Meal quantities ── */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-3 ml-1">
                           Meal Quantities
                        </Typography>
                        <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline/10">
                           {MEAL_OPTIONS.map((meal, index) => (
                              <View
                                 key={meal.key}
                                 className={`flex-row items-center gap-4 px-4 py-4 ${
                                    index < MEAL_OPTIONS.length - 1
                                       ? "border-b border-outline/10"
                                       : ""
                                 }`}
                              >
                                 {/* Icon */}
                                 <View
                                    className={`w-10 h-10 rounded-xl items-center justify-center ${meal.bg}`}
                                 >
                                    <MaterialCommunityIcons
                                       name={meal.icon as any}
                                       size={20}
                                       color={meal.color}
                                    />
                                 </View>

                                 {/* Label */}
                                 <View className="flex-1">
                                    <Typography className="text-on-surface font-bold text-[15px]">
                                       {meal.label}
                                    </Typography>
                                    <Typography className="text-secondary-400 text-xs mt-0.5">
                                       {meal.time}
                                    </Typography>
                                 </View>

                                 {/* Stepper */}
                                 <QuantityStepper
                                    value={quantities[meal.key]}
                                    onChange={(v) => setQty(meal.key, v)}
                                    color={meal.color}
                                 />
                              </View>
                           ))}
                        </View>

                        {/* Total summary */}
                        {totalMeals > 0 && (
                           <View className="flex-row items-center gap-2 mt-3 px-1">
                              <MaterialCommunityIcons
                                 name="silverware-fork-knife"
                                 size={14}
                                 color={Colors.icon.primary}
                              />
                              <Typography className="text-secondary-300 text-xs">
                                 {activeMeals
                                    .map((m) => `${quantities[m.key]}× ${m.label}`)
                                    .join("  ·  ")}
                              </Typography>
                           </View>
                        )}
                     </View>

                     {/* ── Note ── */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Note (optional)
                        </Typography>
                        <View className="bg-surface border border-outline/20 rounded-2xl px-4 py-3">
                           <TextInput
                              value={note}
                              onChangeText={setNote}
                              placeholder="Any note about this meal..."
                              placeholderTextColor={Colors.placeholder}
                              multiline
                              numberOfLines={2}
                              textAlignVertical="top"
                              className="text-on-surface text-sm min-h-[48px]"
                           />
                        </View>
                     </View>

                     {/* ── Submit ── */}
                     <TouchableOpacity
                        onPress={handleSubmit}
                        activeOpacity={0.85}
                        disabled={
                           totalMeals === 0 || isLoading || (mode === "member" && !selectedMemberId)
                        }
                        className={`h-14 rounded-2xl items-center justify-center flex-row gap-2 ${
                           totalMeals > 0 && (mode === "self" || selectedMemberId)
                              ? "bg-primary active:opacity-80"
                              : "bg-surface"
                        }`}
                     >
                        <MaterialCommunityIcons
                           name="silverware-fork-knife"
                           size={20}
                           color={
                              totalMeals > 0 && (mode === "self" || selectedMemberId)
                                 ? "#0F172A"
                                 : "#334155"
                           }
                        />
                        <Typography
                           className={`font-bold text-base ${
                              totalMeals > 0 && (mode === "self" || selectedMemberId)
                                 ? "text-background"
                                 : "text-secondary-400"
                           }`}
                        >
                           {isLoading
                              ? "Logging..."
                              : totalMeals === 0
                                ? "Set quantities above"
                                : mode === "member" && !selectedMemberId
                                  ? "Select a member"
                                  : `Log ${totalMeals} Meal${totalMeals > 1 ? "s" : ""}${mode === "member" && selectedMemberId ? ` for ${members.find((m) => m.id === selectedMemberId)?.name.split(" ")[0]}` : ""}`}
                        </Typography>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   );
};
