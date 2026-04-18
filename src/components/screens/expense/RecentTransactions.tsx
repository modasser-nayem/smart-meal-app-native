import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
export type TransactionType = "meal" | "group";

export interface Transaction {
   id: string;
   title: string;
   amount: number;
   payer: string;
   date: string;
   type: TransactionType;
   icon: string;
}

interface RecentTransactionsProps {
   transactions: Transaction[];
   onSeeAll?: () => void;
   onPress?: (id: string) => void;
}

const TYPE_CONFIG: Record<
   TransactionType,
   { color: string; label: string; iconColor: string; border: string }
> = {
   meal: {
      color: "bg-primary/10",
      label: "transactions.meal",
      iconColor: Colors.icon.primary,
      border: "border-l-primary",
   },
   group: {
      color: "bg-info/10",
      label: "transactions.group",
      iconColor: Colors.icon.info,
      border: "border-l-info",
   },
};

export const RecentTransactions = ({
   transactions,
   onSeeAll,
   onPress,
}: RecentTransactionsProps) => {
   const { t } = useTranslation("expense");
   const { format } = useCurrencyFormat();
   if (transactions.length === 0) {
      return (
         <View className="px-5 mt-5">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-3 ml-1">
               {t("transactions.title")}
            </Typography>
            <View className="bg-surface-container rounded-3xl px-5 py-10 items-center border border-outline">
               <MaterialCommunityIcons
                  name="receipt-text-outline"
                  size={36}
                  color={Colors.icon.muted}
               />
               <Typography className="text-secondary-400 text-sm mt-3">
                  {t("transactions.noTransactions")}
               </Typography>
            </View>
         </View>
      );
   }

   return (
      <View className="px-5 mt-5">
         <View className="flex-row items-center justify-between mb-3 ml-1">
            <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest">
               {t("transactions.title")}
            </Typography>
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
               <Typography className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  {t("members.seeAll")}
               </Typography>
            </TouchableOpacity>
         </View>

         <View className="bg-surface-container rounded-3xl overflow-hidden border border-outline">
            {transactions.map((item, index) => {
               const cfg = TYPE_CONFIG[item.type];
               return (
                  <TouchableOpacity
                     key={item.id}
                     onPress={() => onPress?.(item.id)}
                     activeOpacity={0.75}
                     className={`flex-row items-center gap-4 px-4 py-4 border-l-[3px] active:bg-surface ${
                        cfg.border
                     } ${index < transactions.length - 1 ? "border-b border-outline" : ""}`}
                  >
                     {/* Icon */}
                     <View
                        className={`w-12 h-12 rounded-2xl items-center justify-center ${cfg.color}`}
                     >
                        <MaterialCommunityIcons
                           name={item.icon as any}
                           size={24}
                           color={cfg.iconColor}
                        />
                     </View>

                     {/* Info */}
                     <View className="flex-1">
                        <Typography className="text-on-surface font-semibold text-[15px] leading-tight">
                           {item.title}
                        </Typography>
                        <View className="flex-row items-center gap-2 mt-0.5">
                           <Typography className="text-secondary-400 text-xs">
                              {item.payer}
                           </Typography>
                           <View className="w-1 h-1 rounded-full bg-outline/40" />
                           <Typography className="text-secondary-400 text-xs">
                              {item.date}
                           </Typography>
                        </View>
                     </View>

                     {/* Amount + type */}
                     <View className="items-end">
                        <Typography className="text-on-surface font-bold text-base">
                           {format(item.amount)}
                        </Typography>
                        <View className={`px-2 py-0.5 rounded-md mt-1 ${cfg.color}`}>
                           <Typography
                              className="text-[9px] font-black uppercase tracking-widest"
                              style={{ color: cfg.iconColor }}
                           >
                              {t(cfg.label)}
                           </Typography>
                        </View>
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      </View>
   );
};
