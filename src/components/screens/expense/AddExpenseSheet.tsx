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
import { useTranslation } from "react-i18next";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/colors";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

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
   const { t } = useTranslation("expense");
   const { symbol } = useCurrencyFormat();
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
                     {t("addExpense.title")}
                  </Typography>
                  <TouchableOpacity
                     onPress={handleClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 40 }}
               >
                  {/* Amount input — big and prominent */}
                  <View className="items-center py-6 border-b border-outline/10">
                     <View className="flex-row items-baseline gap-2">
                        <Typography className="text-primary text-4xl font-bold">
                           {symbol()}
                        </Typography>
                        <TextInput
                           value={amount}
                           onChangeText={setAmount}
                           placeholder="0"
                           placeholderTextColor={Colors.placeholder}
                           keyboardType="decimal-pad"
                           className="text-on-surface text-6xl font-extrabold text-center min-w-[120px]"
                           style={{ includeFontPadding: false }}
                        />
                     </View>
                     <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mt-2">
                        {t("addExpense.amount")}
                     </Typography>
                  </View>

                  <View className="px-6 pt-5 gap-5">
                     {/* Type toggle */}
                     <View className="flex-row bg-surface rounded-2xl p-1 border border-outline/15">
                        {(["meal", "group"] as ExpenseType[]).map((expenseType) => (
                           <TouchableOpacity
                              key={expenseType}
                              onPress={() => setType(expenseType)}
                              activeOpacity={0.8}
                              className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${
                                 type === expenseType ? "bg-primary" : ""
                              }`}
                           >
                              <MaterialCommunityIcons
                                 name={
                                    expenseType === "meal"
                                       ? "silverware-fork-knife"
                                       : "account-group-outline"
                                 }
                                 size={16}
                                 color={type === expenseType ? "#0F172A" : "#94A3B8"}
                              />
                              <Typography
                                 className={`text-sm font-bold capitalize ${
                                    type === expenseType ? "text-background" : "text-secondary-300"
                                 }`}
                              >
                                 {expenseType === "meal"
                                    ? t("addExpense.mealCost")
                                    : t("addExpense.groupCost")}
                              </Typography>
                           </TouchableOpacity>
                        ))}
                     </View>

                     {/* Title */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           {t("addExpense.expenseTitle")}
                        </Typography>
                        <View className="flex-row items-center bg-surface border border-outline/20 rounded-2xl px-4 h-14 gap-3">
                           <MaterialCommunityIcons
                              name="shopping-outline"
                              size={20}
                              color={Colors.icon.dim}
                           />
                           <TextInput
                              value={title}
                              onChangeText={setTitle}
                              placeholder="e.g. Monthly Groceries"
                              placeholderTextColor={Colors.placeholder}
                              className="flex-1 text-on-surface text-base"
                           />
                        </View>
                     </View>

                     {/* Date — read only for now */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           {t("addExpense.date")}
                        </Typography>
                        <View className="flex-row items-center bg-surface border border-outline/20 rounded-2xl px-4 h-14 gap-3">
                           <MaterialCommunityIcons
                              name="calendar-outline"
                              size={20}
                              color={Colors.icon.primary}
                           />
                           <Typography className="text-on-surface text-base font-medium">
                              {today}
                           </Typography>
                        </View>
                     </View>

                     {/* Description */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           {t("addExpense.notes")}
                        </Typography>
                        <View className="bg-surface border border-outline/20 rounded-2xl px-4 py-3">
                           <TextInput
                              value={description}
                              onChangeText={setDescription}
                              placeholder="Any notes about this expense..."
                              placeholderTextColor={Colors.placeholder}
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
                        {t("addExpense.title")}
                     </Button>
                  </View>
               </ScrollView>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   );
};
