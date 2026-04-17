import { useState } from "react";
import {
   View,
   TouchableOpacity,
   Modal,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   TextInput,
} from "react-native";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

type ExpenseType = "meal" | "group";

interface AddExpenseSheetProps {
   visible: boolean;
   onClose: () => void;
   onSubmit: (data: {
      title: string;
      amount: number;
      type: ExpenseType;
      date: string;
      description?: string;
   }) => void;
   isLoading?: boolean;
}

export const AddExpenseSheet = ({
   visible,
   onClose,
   onSubmit,
   isLoading = false,
}: AddExpenseSheetProps) => {
   const [amount, setAmount] = useState("");
   const [title, setTitle] = useState("");
   const [type, setType] = useState<ExpenseType>("meal");
   const [description, setDescription] = useState("");

   const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
   });

   const handleSubmit = () => {
      const parsed = parseFloat(amount);
      if (!title.trim() || isNaN(parsed) || parsed <= 0) return;
      onSubmit({ title: title.trim(), amount: parsed, type, date: today, description });
      handleClose();
   };

   const handleClose = () => {
      setAmount("");
      setTitle("");
      setType("meal");
      setDescription("");
      onClose();
   };

   const isValid = title.trim().length > 0 && parseFloat(amount) > 0;

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
            {/* Backdrop */}
            <TouchableOpacity
               className="flex-1 bg-black/60"
               activeOpacity={1}
               onPress={handleClose}
            />

            {/* Sheet */}
            <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10">
               {/* Handle */}
               <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

               {/* Header */}
               <View className="flex-row items-center justify-between px-6 py-4">
                  <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                     Add Expense
                  </Typography>
                  <TouchableOpacity
                     onPress={handleClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color="#94A3B8" />
                  </TouchableOpacity>
               </View>

               <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 40 }}
               >
                  {/* Amount input — big and prominent */}
                  <View className="items-center py-6 border-b border-outline/10">
                     <View className="flex-row items-baseline gap-2">
                        <Typography className="text-primary text-4xl font-bold">৳</Typography>
                        <TextInput
                           value={amount}
                           onChangeText={setAmount}
                           placeholder="0"
                           placeholderTextColor="#334155"
                           keyboardType="decimal-pad"
                           className="text-on-surface text-6xl font-extrabold text-center min-w-[120px]"
                           style={{ includeFontPadding: false }}
                        />
                     </View>
                     <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-2">
                        Enter Amount
                     </Typography>
                  </View>

                  <View className="px-6 pt-5 gap-5">
                     {/* Type toggle */}
                     <View className="flex-row bg-surface rounded-2xl p-1 border border-outline/15">
                        {(["meal", "group"] as ExpenseType[]).map((t) => (
                           <TouchableOpacity
                              key={t}
                              onPress={() => setType(t)}
                              activeOpacity={0.8}
                              className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${
                                 type === t ? "bg-primary" : ""
                              }`}
                           >
                              <MaterialCommunityIcons
                                 name={
                                    t === "meal" ? "silverware-fork-knife" : "account-group-outline"
                                 }
                                 size={16}
                                 color={type === t ? "#0F172A" : "#94A3B8"}
                              />
                              <Typography
                                 className={`text-sm font-bold capitalize ${
                                    type === t ? "text-background" : "text-secondary-300"
                                 }`}
                              >
                                 {t === "meal" ? "Meal Cost" : "Group Cost"}
                              </Typography>
                           </TouchableOpacity>
                        ))}
                     </View>

                     {/* Title */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Expense Title
                        </Typography>
                        <View className="flex-row items-center bg-surface border border-outline/20 rounded-2xl px-4 h-14 gap-3">
                           <MaterialCommunityIcons
                              name="shopping-outline"
                              size={20}
                              color="#64748B"
                           />
                           <TextInput
                              value={title}
                              onChangeText={setTitle}
                              placeholder="e.g. Monthly Groceries"
                              placeholderTextColor="#334155"
                              className="flex-1 text-on-surface text-base"
                           />
                        </View>
                     </View>

                     {/* Date — read only for now */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Date
                        </Typography>
                        <View className="flex-row items-center bg-surface border border-outline/20 rounded-2xl px-4 h-14 gap-3">
                           <MaterialCommunityIcons
                              name="calendar-outline"
                              size={20}
                              color="#F59E0B"
                           />
                           <Typography className="text-on-surface text-base font-medium">
                              {today}
                           </Typography>
                        </View>
                     </View>

                     {/* Description */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Notes (optional)
                        </Typography>
                        <View className="bg-surface border border-outline/20 rounded-2xl px-4 py-3">
                           <TextInput
                              value={description}
                              onChangeText={setDescription}
                              placeholder="Any notes about this expense..."
                              placeholderTextColor="#334155"
                              multiline
                              numberOfLines={3}
                              textAlignVertical="top"
                              className="text-on-surface text-sm min-h-[72px]"
                           />
                        </View>
                     </View>

                     {/* Submit */}
                     <Button
                        onPress={handleSubmit}
                        loading={isLoading}
                        disabled={!isValid}
                        fullWidth
                        size="lg"
                        className="rounded-2xl mt-2"
                     >
                        Add Expense
                     </Button>
                  </View>
               </ScrollView>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   );
};
